import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState)
    const setLoading = () => dispatch({ type: 'SET_LOADING' })
    const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

    // Get User
    //fetch data for a single user from GitHub
    const getUser = async (login) => {
        setLoading()

        const reponse = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        //if the user is not found, redirect to the not-found page
        if (Response.status === 404) {
            window.location = '/not-found'
        } else {
            const data = await reponse.json()

            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }

    // Get User Repos
    //fetch repos for a single user from GitHub
    const getUserRepos = async (login) => {
        setLoading()
        const params = new URLSearchParams({
            per_page: 5,
            sort: 'created: asc'
        })

        const reponse = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await reponse.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }

    return <GithubContext.Provider value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext
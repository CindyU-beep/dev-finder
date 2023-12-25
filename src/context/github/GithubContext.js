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

    // Search Users
    //implements the search functionality for finding users from GitHub
    // e.g. api.github.com/search/users?q=cindy *}
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })
        const reponse = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const { items } = await reponse.json()
        //dispatch is a function that we can use to dispatch objects to the reducer
        dispatch({
            type: 'GET_USERS',
            payload: items //payload is the data that we want to send to the reducer
        })
    }

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
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext
import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState) 
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    //get users for testing
    const fetchUsers = async () => {
        setLoading()
        const reponse = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await reponse.json()
        //dispatch is a function that we can use to dispatch objects to the reducer
        dispatch({
            type: 'GET_USERS',
            payload: data //payload is the data that we want to send to the reducer
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext
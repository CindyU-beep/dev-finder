import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

//github axios instance
const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`
    }
})
// Search Users
//implements the search functionality for finding users from GitHub
// e.g. api.github.com/search/users?q=cindy *}
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })

    const response = await github.get(`/search/users?${params}`)
    return response.data.items
    // const reponse = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    //     headers: {
    //         Authorization: `token ${GITHUB_TOKEN}`
    //     }
    // })

    // const { items } = await reponse.json()
    // //dispatch is a function that we can use to dispatch objects to the reducer
    // return items
}

// Get User & Repos
//fetch data for a single user from GitHub
export const getUserAndRepos = async (login) => {
    const params = new URLSearchParams({
        per_page: 5,
        sort: 'created: asc'
    })

    try {
        const [userResponse, reposResponse] = await Promise.all([
            github.get(`/users/${login}`),
            github.get(`/users/${login}/repos?${params}`)
        ])

        return { user: userResponse.data, repos: reposResponse.data }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            window.location = '/not-found'
        }
        throw error
    }
}
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Search Users
//implements the search functionality for finding users from GitHub
// e.g. api.github.com/search/users?q=cindy *}
export const searchUsers = async (text) => {
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
    return items
}

// Get User
//fetch data for a single user from GitHub
export const getUser = async (login) => {

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

        return data
    }
}

// Get User Repos
//fetch repos for a single user from GitHub
export const getUserRepos = async (login) => {
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

    return data
}
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
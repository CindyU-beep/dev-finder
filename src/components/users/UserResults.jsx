import {useEffect, useState} from 'react'
import Loader from '../layout/Loader'
import UserItem from './UserItem'

function UserResults() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const reponse = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })

        const data = await reponse.json()
        setUsers(data)
        setLoading(false)
    }
    if (!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 
            lg:grid-cols-3 md: grid-cols-2'>{users.map((user) => (
                <UserItem key={user.id} user={user}/>
            ))}
            </div>
          )
    } else {
        return (
            <h3> <Loader/></h3>
        )
    }
}

export default UserResults
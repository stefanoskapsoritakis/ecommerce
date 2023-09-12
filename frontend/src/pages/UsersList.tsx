import React, { useEffect } from 'react'

import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import { fetchAllUsers } from '../redux/reducers/usersReducer'
import NavBar from '../components/NavBar'

const UsersList = () => {
    const { users, loading, error } = useAppSelector(state => state.usersReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAllUsers({ page: 1, per_page: 20 }))
    }, [])
    return (
        <>
            <NavBar />
            {users.map(user => (
                <li key={user.id}>
                    <p >{user.name}: {user.email}</p>
                </li>
            ))}
            <a href="/">
                <button>Home</button>
            </a>
        </>
    )
}

export default UsersList
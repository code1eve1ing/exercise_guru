import React from 'react'
import { useSelector } from 'react-redux'
const Header = () => {

    const authState = useSelector(state => state.auth)
    return (
        <div className="sticky top-0  mb-4 md:mb-6 lg:mb-10 bg-violet-700 rounded-lg z-50">
            <h1 >ExerciseGuru</h1>
            <p>{authState.user.name}</p>
            <p>{authState.user.email}</p>
            <p>{authState.user._id}</p>
        </div>
    )
}

export default Header
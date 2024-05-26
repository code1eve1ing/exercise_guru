import React from 'react'
import { login } from '../action/auth';
import { useSelector, useDispatch } from "react-redux";

const Auth = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.auth)
    const handleClick = () => {
        dispatch(login({ name: 'sanket', password: 'z87398*(0-90)' }))
    }
    return (
        <div onClick={handleClick}>{JSON.stringify(state)}</div>
    )
}

export default Auth
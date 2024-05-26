export const login = (userDetails) => ({
    type: 'LOGIN',
    payload: userDetails
})

export const setUser = user => ({
    type: 'SET_USER',
    payload: user
})

export const setStats = stats => ({
    type: 'SET_STATS',
    payload: stats
})

export const stopAction = {
    type: "rotate",
    payload: false
};
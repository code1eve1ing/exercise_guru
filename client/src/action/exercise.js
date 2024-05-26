export const addSchedule = schedule => ({
    type: 'ADD_SCHEDULE',
    payload: schedule
})

export const addExercise = payload => ({
    type: 'ADD_EXERCISE',
    payload: payload
})

export const setSchedules = schedules => ({
    type: 'SET_SCHEDULES',
    payload: schedules
})

export const setExercises = exercises => ({
    type: 'SET_EXERCISES',
    payload: exercises
})

export const setSelectedExercise = exercise => ({
    type: 'SET_SELECTED_EXERCISE',
    payload: exercise
})

export const updatedSchedule = schedule => ({
    type: 'UPDATE_SCHEDULE',
    payload: schedule
})
// eslint-disable-next-line import/no-anonymous-default-export
const initialState = {
    exercises: [],
    schedules: [],
    selectedExercise: {}
}

const authReducer = (state = initialState, action) => {

    let schedules
    let exercises
    let schedule

    switch (action.type) {

        case 'SET_SCHEDULES':

            schedules = action.payload
            return {
                ...state,
                schedules
            }

        case 'SET_EXERCISES':

            exercises = action.payload
            return {
                ...state,
                exercises
            }

        case 'ADD_SCHEDULE':

            schedule = action.payload
            schedules = state.schedules
            schedules.push(schedule)

            return {
                ...state,
                schedules
            }

        case 'ADD_EXERCISE':

            const { _id, exercise } = action.payload
            schedules = state.schedules.map(schedule => {
                if (schedule._id === _id) {
                    schedule.exercises.push(exercise)
                }
                return schedule
            })

            return {
                ...state,
                schedules
            }

        case 'SET_SELECTED_EXERCISE':

            const selectedExercise = action.payload

            return {
                ...state,
                selectedExercise
            }

        case 'UPDATE_SCHEDULE':

            schedule = action.payload
            schedules = state.schedules

            if (schedule) schedules = schedules.map(set => set._id === schedule._id ? schedule : set)

            return {
                ...state,
                schedules
            }

        default:
            return state
    }
};

export default authReducer;

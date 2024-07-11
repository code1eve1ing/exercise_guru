const initialState = {
    showLoginModal: false,
    showScheduleModal: false,
    showExercisePlayerModal: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SHOW_LOGIN_MODAL":
            return {
                showLoginModal: action.payload
            }

        case "SHOW_SCHEDULE_MODAL":
            return {
                showScheduleModal: action.payload
            }

        case "SHOW_EXERCISE_PLAYER_MODAL":
            return {
                showExercisePlayerModal: action.payload
            }
            
        default:
            return state;
    }
}

export default modalReducer
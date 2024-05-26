const initialState = {
    showLoginModal: false,
    showScheduleModal: false
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

        default:
            return state;
    }
}

export default modalReducer
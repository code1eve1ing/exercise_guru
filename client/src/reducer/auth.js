// eslint-disable-next-line import/no-anonymous-default-export
const initialState = {
  isAuthenticated: false,
  user: { name: "", email: "" },
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case "LOGIN":

      return {
        ...state,
      }

    case "SET_USER":

      const { _id = '', name = '', email = '' } = action.payload
      return {
        ...state,
        user: {
          ...state.user,
          _id,
          name,
          email
        },
      }

    case 'SET_STATS':

      const { isAuthenticated } = action.payload
      return {
        ...state,
        isAuthenticated
      }

    default:
      return state;
  }
};

export default authReducer;

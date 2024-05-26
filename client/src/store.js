import { createStore, combineReducers } from "redux";
import authReducer from "./reducer/auth";
import modalReducer from "./reducer/modal";
import ExerciseReducer from "./reducer/exercise";

const rootReducer = combineReducers({
    auth:authReducer,
    modal: modalReducer,
    exercise: ExerciseReducer
})

function configureStore(state) {
    return createStore(rootReducer, state);
}

export default configureStore
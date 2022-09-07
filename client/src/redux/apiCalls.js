import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from 'axios'

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const response = await axios.post('http://localhost:5000/bazar/auth/signin', user);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}
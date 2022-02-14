import createDataContext from './createDataContext';
import {Auth} from 'aws-amplify';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'refresh_auth':
            return action.payload;
        default:
            return state;
    }
}

const refreshAuthStatus = dispatch => async () => {
    try {
        await Auth.currentAuthenticatedUser()
        dispatch({ type: 'refresh_auth', payload: true })
    } catch (error) {
        dispatch({ type: 'refresh_auth', payload: false })
    }
}






export const { Provider, Context } = createDataContext(authReducer, {
    refreshAuthStatus
}, false);
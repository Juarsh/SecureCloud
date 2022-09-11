import { createContext, useReducer } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import constants from '../config';

const initialState = {
    refreshToken: '',
    accessToken: '',
    email: '',
    id: '',
    verified: false
}

const authReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            const decodedToken = decodeToken(action.payload.accessToken);
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("ip", "127.0.0.1");
            localStorage.setItem("latitude", "80");
            localStorage.setItem("longitude", "80");
            
            navigator.geolocation.getCurrentPosition((position) => {
                localStorage.setItem("latitude", "" + position.coords.latitude);
                localStorage.setItem("longitude", "" + position.coords.longitude);
            })

            return {
                ...state,
                email: decodedToken.email,
                id: decodedToken.id,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                verified: true
            }
        case 'VERIFY_USER':
            return {
                ...state,
                verified: true
            }
        case 'LOGOUT_USER':
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/";
            return {
                ...state,
                email: '',
                id: '',
                accessToken: '',
                refreshToken: '',
                verified: false
            }
        default:
            return state;
    }
}

const Context = createContext({
    email: '',
    id: '',
    accessToken: '',
    refreshToken: '',
    verified: false,
    setUser: (data) =>{},
    logoutUser: () => {},
    verifyUser: () => {}
});

const Provider = (props) => {
    
    const [state, dispatch] = useReducer(authReducer, initialState);

    const setUser = (data) => {
        dispatch({
            type: 'SET_USER',
            payload: data
        });
    }

    const verifyUser = () => {
        dispatch({
            type: 'VERIFY_USER',
        });
    }

    const logoutUser = () => {
        dispatch({
            type: 'LOGOUT_USER',
        });
    }

    return (
        <Context.Provider
            value = {{ id: state.id, email: state.email, accessToken: state.accessToken, refreshToken: state.refreshToken, verified: state.verified, setUser, logoutUser, verifyUser }}
            {...props}
        />
    );
}

export { Context, Provider};
import axios from 'axios';
import constants from '../config';
import { isExpired } from "react-jwt";

export const checkExpiredAccessToken = (context, accessToken, refreshToken) => {

    if(isExpired(accessToken)) {
        axios.get(`${constants.SERVER_URL}/stark/refreshTokenGenerate`, {
            params: {
                refreshToken: refreshToken,
            }
        })
        .then((res, err) => {
            if(err) {
                context.logoutUser();
            }
            context.setUser({refreshToken: res.data.refreshToken, accessToken: res.data.accessToken});
        }).catch((err) =>{
            context.logoutUser();
        });
    } else {
        context.setUser({refreshToken: refreshToken, accessToken: accessToken});
    }
}
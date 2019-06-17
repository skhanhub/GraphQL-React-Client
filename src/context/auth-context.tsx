import React from 'react';


export default React.createContext({
    token: null,
    userId: null,
    login: (token: string, userId: string, tokenExpiration: number) => {},
    logout: (token: string, userId: string, tokenExpiration: number) =>{},
});
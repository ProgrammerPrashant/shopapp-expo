import { AsyncStorage } from 'react-native';
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = "LOGOUT";
export const authenticate = (userId, token) => {

    return {type : AUTHENTICATE , userId: userId, token: token};

};

export const signup = (email, password) => {

    return async dispatch => {
     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5X-lYf8V33xmV3F1T8ALNJ0JN-MzuXJ0'
        ,{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email : email,
                password: password,
                returnSecureToken : true
            })
        });

        if(!response.ok) {
            //  throw new Error('Something Went Wrong');
            const errorResData = await response.json();
            const errorId =errorResData.error.message;
            
            //console.log(errorResData);
            let message = "Something Went Wrong !";
            if(errorId === 'EMAIL_EXISTS') {
              message = 'This email exists Already';
            }
           
            throw new Error(message);
          }

        const resData = await response.json();
        console.log(resData);

        dispatch(authenticate(resData.localId, resData.idToken));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);


    };

};


export const login = (email, password) => {

    return async dispatch => {
     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5X-lYf8V33xmV3F1T8ALNJ0JN-MzuXJ0'
        ,{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email : email,
                password: password,
                returnSecureToken : true
            })
        });

        if(!response.ok) {
          //  throw new Error('Something Went Wrong');
          const errorResData = await response.json();
          const errorId =errorResData.error.message;
          
          //console.log(errorResData);
          let message = "Something Went Wrong !";
          if(errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email Could not Found';
          }
          else if(errorId === 'INVALID_PASSWORD') {
              message = 'This password is not Valid';
          }
          throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);

        dispatch(authenticate(resData.localId, resData.idToken));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };

};


export const logout = () => {
    return {type: LOGOUT};
};


const saveDataToStorage = (token, userId, expirationDate) => {

    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));

}; 
export const ACTION_TYPES ={
    SET_USR_DATA:'sets user data after successful login',
    UNSET_USER_DATA: 'unsets user data after logout'
}

export function reducer(state,action){
    switch (action.type) {
        case ACTION_TYPES.SET_USR_DATA:
            return {...state, userData:action.payload.userData}
        case ACTION_TYPES.SET_USR_DATA:
            const {userData,...rest}=state
            return {...rest}
    }
}
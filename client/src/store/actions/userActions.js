import { handleErrors } from './index';
export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const fetchUsersBegin = () => ({
    type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = userArr => ({
    type: FETCH_USERS_SUCCESS,
    payload: { userArr }
});

export const fetchUsersFailure = error => ({
    type: FETCH_USERS_FAILURE,
    payload: { error }
});

export const loadUsers = () => {
    return dispatch => {
        dispatch(fetchUsersBegin())
        return fetch("/users")
            .then(handleErrors)
            .then(res => res.json())
            .then(users => {
                dispatch(fetchUsersSuccess(users))
                return users
            })
            .catch(error => dispatch(fetchUsersFailure(error)))
    };
}
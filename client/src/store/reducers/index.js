import storeState from '../state';
import { combineReducers } from 'redux';
import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_POSTS_BEGIN,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    TOGGLE_DROP_DOWN
} from '../actions';

const users = (state = storeState.users, action) => {
    switch(action.type){
        case FETCH_USERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state, 
                loading: false,
                userArr: action.payload.userArr
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                userArr: []
            };
        default:
            return state;
    }
}

const posts = (state = storeState.posts, action) => {
    switch(action.type){
        case FETCH_POSTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                postArr: action.payload.postArr
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                postArr: []
            };
        default: 
            return state;
    }
}

const dropDown = (state = storeState.dropDown, action) => {
    switch(action.type){
        case TOGGLE_DROP_DOWN:
            return !state
        default:
            return state
    }
}

const rootReducer = combineReducers({
    users, posts, dropDown
});

export default rootReducer;

import storeState from '../state';
import { combineReducers } from 'redux';
import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_POSTS_BEGIN,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
} from '../actions';

const users = (state = storeState, action) => {
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
                users: action.payload.users
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                users: []
            };
        default:
            return state;
    }
}
const posts = (state = storeState, action) => {
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
                posts: action.payload.posts
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                posts: []
            };
        default: 
            return state;
    }
}


const rootReducer = combineReducers({
    users, posts
});

export default rootReducer;

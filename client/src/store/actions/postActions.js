import { handleErrors } from './index';

export const FETCH_POSTS_BEGIN = "FETCH_POSTS_BEGIN";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const fetchPostsBegin = () => ({
    type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = postArr => ({
    type: FETCH_POSTS_SUCCESS,
    payload: { postArr }
});

export const fetchPostsFailure = error => ({
    type: FETCH_POSTS_FAILURE,
    payload: { error }
});

export const loadPosts = (userId) => {
    return dispatch => {
        dispatch(fetchPostsBegin());
        return fetch(`/users/${userId}/posts`)
            .then(handleErrors)
            .then(res => res.json())
            .then(posts => {
                dispatch(fetchPostsSuccess(posts))
                return posts;
            })
            .catch(error => dispatch(fetchPostsFailure(error)))
    };
}


export const createPost = (userId, newPost) => {
    console.log("ACTIONS:", newPost)
    return dispatch => {
        fetch(`/users/${userId}/posts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost)
        }).then(() => dispatch(loadPosts(userId)));
    }
}

export const showPost = (userId, postId, post) => {
    console.log("ACTIONS SHOW:", post)
    return dispatch => {
        fetch(`/users/${userId}/posts/${postId}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then(()=> dispatch(loadPosts(userId)))
    }
}

export const updatePost = (userId, postId, post) => {
    console.log("ACTIONS UPDATE:", post)
    return dispatch => {
        fetch(`/users/${userId}/posts/${postId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then(()=> dispatch(loadPosts(userId)))
    }
}

export const deletePost = (userId, postId, post) => {
    return dispatch => {
        fetch(`/users/${userId}/posts/${postId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then(()=> dispatch(loadPosts(userId)))
    }
}
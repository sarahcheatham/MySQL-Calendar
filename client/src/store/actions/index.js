//handle errors 
export const handleErrors = response => {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

//user fetch
export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const fetchUsersBegin = () => ({
    type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = users => ({
    type: FETCH_USERS_SUCCESS,
    payload: { users }
});

export const fetchUsersFailure = error => ({
    type: FETCH_USERS_FAILURE,
    payload: { error }
});

export const loadUsers = () => {
    return dispatch => {
        dispatch(fetchUsersBegin())
        return fetch("http://localhost:3000/api/users")
            .then(handleErrors)
            .then(res => res.json())
            .then(users => {
                dispatch(fetchUsersSuccess(users))
                return users
            })
            .catch(error => dispatch(fetchUsersFailure(error)))
    };
}


//posts fetch

export const FETCH_POSTS_BEGIN = "FETCH_POSTS_BEGIN";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const fetchPostsBegin = () => ({
    type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = posts => ({
    type: FETCH_POSTS_SUCCESS,
    payload: { posts }
});

export const fetchPostsFailure = error => ({
    type: FETCH_POSTS_FAILURE,
    payload: { error }
});

export const loadPosts = () => {
    return dispatch => {
        dispatch(fetchPostsBegin());
        return fetch('http://localhost:3000/api/calendar')
            .then(handleErrors)
            .then(res => res.json())
            .then(posts => {
                dispatch(fetchPostsSuccess(posts))
                return posts;
            })
            .catch(error => dispatch(fetchPostsFailure(error)))
    };
}


export const createPost = newPost => {
    console.log("ACTIONS:", newPost)
    return dispatch => {
        fetch('http://localhost:3000/api/calendar', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost)
        }).then(() => dispatch(loadPosts()));
    }
}




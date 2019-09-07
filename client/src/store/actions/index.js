//handle errors 
export const handleErrors = response => {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

export const TOGGLE_DROP_DOWN = "TOGGLE_DROP_DOWN";

export const toggleDropDown = () => {
    return {
        type: TOGGLE_DROP_DOWN
    }
}


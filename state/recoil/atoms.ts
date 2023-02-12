import { atom } from "recoil";

export const loggedInUser = atom({
    key: 'loggedInUser', 
    default: {username: null, email: null}
});
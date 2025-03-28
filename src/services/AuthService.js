import config from 'config';
import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers';

const authUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

function login(email, password, serverName, path) {

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('serverName', serverName);
    formData.append('path', path);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(`${config.apiDomain}/api/auth/login`, requestOptions)
        .then(response => handleResponse(response, true) )
        .then(user => {
            update(user);

            return user;
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    authUserSubject.next(null);
}

function update(user) {
    // update user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    authUserSubject.next(user);
}

export default {
    login,
    logout,
    update,
    observable: authUserSubject.asObservable(),
    get authUser () { return authUserSubject.value }
};
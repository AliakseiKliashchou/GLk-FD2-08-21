export const getToken = () => localStorage.getItem('token');

export const setToken = token => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');

export const getUserEmail = () => localStorage.getItem('userEmail');

export const setUserEmail = email => localStorage.setItem('userEmail', email);

export const removeUserEmail = () => localStorage.removeItem('userEmail');

export const getUID = () => localStorage.getItem('uid');

export const setUID = id => localStorage.setItem('uid', id);

export const removeUID = () => localStorage.removeItem('uid');

export const clearStorage = () => localStorage.clear();

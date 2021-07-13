require('firebase/auth');
import firebase from 'firebase/app';
import axios from 'axios';

import { FIREBASE_CONFIG, databaseURL, authUrl } from './api-config.js';
import { showErrorNotification } from '../shared/error-handlers';

const headers = {
  'Content-Type': 'application/json'
};

export const initApi = () => {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export const createPost = post => {
  const { userId, name, email, date, title, content } = post;
  return fetch(`${databaseURL}/posts.json`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        userId,
        name,
        email,
        date,
        title,
        content
      })
    }

  );
}

export const getPosts = () => {
  return fetch(`${databaseURL}/posts.json`, { headers })
    .then( response => response.json())
    .then( result => {
      const transformedPostsArray = Object.keys(result).map( key => ({
        ...result[key],
        id: key
      }));
      return transformedPostsArray;
    });
}

export const signIn = (email, password) => {
  return axios.post(authUrl, {
    email,
    password,
    returnSecureToken: true
  })
    .then(response => response)
    .catch(err => {
      showErrorNotification(err);
    });
}

export const signUp = async (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => response);
}

initApi();




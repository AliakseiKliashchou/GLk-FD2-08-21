require('firebase/auth');
import firebase from 'firebase/app';
import axios from 'axios';

import { FIREBASE_CONFIG, databaseURL, authUrl } from './api-config.js';
import { showErrorNotification } from '../shared/error-handlers';
import { setUID, getUID, setToken } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';

const headers = {
  'Content-Type': 'application/json',
};

export const initApi = () => {
  firebase.initializeApp(FIREBASE_CONFIG);
};

export const createPost = (post) => {
  const { userId, name, email, date, title, content } = post;
  return fetch(`${databaseURL}/posts.json`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      userId,
      name,
      email,
      date,
      title,
      content,
    }),
  });
};

export const getPosts = () => {
  return fetch(`${databaseURL}/posts.json`, { headers })
    .then((response) => response.json())
    .then((result) => {
      const transformedPostsArray = Object.keys(result).map((key) => ({
        ...result[key],
        id: key,
      }));
      return transformedPostsArray;
    });
};

export const signIn = (email, password) => {
  return axios
    .post(authUrl, {
      email,
      password,
      returnSecureToken: true,
    })
    .then((response) => {
      if (response) {
        const { idToken: token } = response.data;
        setToken(token);
        window.location.href = routes.home;
      }
    });
};

export const createAuthData = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const { uid } = response.user;
      setUID(uid);
    });
};

export const createUser = (user) => {
  const { firstName, lastName, birth, email } = user;

  return axios.post(`${databaseURL}/users.json`, {
    firstName,
    lastName,
    birth,
    email,
    uuid: getUID(),
  });
};

export const signUp = async (user) => {
  const { password, email } = user;

  try {
    await createAuthData(email, password);
    await createUser(user);
    await signIn(email, password);
  } catch (error) {
    showErrorNotification(error);
  }
};

export const passwordRecovery = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => (window.location.href = routes.sign_in))
    .catch((error) => showErrorNotification(error));
};

initApi();

{
  /* <p>Hello,</p>
<p>Follow this link to reset your %APP_NAME% password for your %EMAIL% account.</p>
<p><a href='%LINK%'>%LINK%</a></p>
<p>If you didn’t ask to reset your password, you can ignore this email.</p>
<p>Thanks,</p>
<p>Your %APP_NAME% team</p> */
}

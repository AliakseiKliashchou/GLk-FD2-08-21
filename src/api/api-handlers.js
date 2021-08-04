require('firebase/auth');
import firebase from 'firebase/app';
import axios from 'axios';

import { FIREBASE_CONFIG, databaseURL, authUrl } from './api-config.js';
import { showErrorNotification } from '../shared/error-handlers';
import { LocalStorageService } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';
import { openBlockSpinner, closedBlockSpinner } from '../components/profile/profile.js';

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
    })
    .catch( err => console.log(err));
}

export const getUser = () => {
  return axios.get(`${databaseURL}/users.json`)
    .then( response => {
      if (response) {
        const transformedUsers = 
          Object.keys(response.data).map( key => ({...response.data[key], id: key}));
        const user = transformedUsers.find( user => user.uuid === LocalStorageService.getUID());
        LocalStorageService.setPersonalData(user);
      }
    })
}

export const getUserById = id => axios.get(`${databaseURL}/users/${id}.json`);

export const getUsers = () => {
  return axios.get(`${databaseURL}/users.json`)
    .then( response => {
      if (response) {
        return Object.keys(response.data).map( key => ({...response.data[key], id: key}));
      }
    });
}; 

export const signIn = (email, password) => {
  return axios.post(authUrl, {
    email,
    password,
    returnSecureToken: true
  })
    .then(response => {
      if (response) {
        const { idToken: token, localId } = response.data;
        LocalStorageService.setToken(token);
        LocalStorageService.setUID(localId);
        getUser().then( () => window.location.href = routes.home);
      }
    });
}

export const createAuthData = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( response => {
      const { uid } = response.user;      
      LocalStorageService.setUID(uid);      
    });
}

export const createUser = user => {
  const { firstName, lastName, birth, email } = user;

  return axios.post(`${databaseURL}/users.json`, {
    firstName,
    lastName,
    birth,
    email,
    uuid: LocalStorageService.getUID()
  });
}

export const signUp = async user => {
  const { password, email } = user;

  try {
    await openBlockSpinner();
    await createAuthData(email, password);
    await createUser(user).then( response => LocalStorageService.setUserId(response.data.name));
    await signIn(email, password);
    closedBlockSpinner();
  } catch (error) {
    closedBlockSpinner();
    showErrorNotification(error);
  }
}

export const passwordRecovery = email => {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => window.location.href = routes.sign_in)
    .catch( error => showErrorNotification(error));
}

initApi();

{/* <p>Hello,</p>
<p>Follow this link to reset your %APP_NAME% password for your %EMAIL% account.</p>
<p><a href='%LINK%'>%LINK%</a></p>
<p>If you didn’t ask to reset your password, you can ignore this email.</p>
<p>Thanks,</p>
<p>Your %APP_NAME% team</p> */}

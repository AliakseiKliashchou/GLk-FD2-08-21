require('firebase/auth');
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';


import { FIREBASE_CONFIG, databaseURL, authURL } from './api-config.js';
import { showErrorNotification } from '../shared/error-handlers';
import { LocalStorageService } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';
import { setUserInfo } from '../shared/helpers';
import { refreshNewPhoto } from '../components/profile/profile';


const headers = {
  'Content-Type': 'application/json'
};

export const initApi = () => {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export const createPost = post => {
  const { userId, name, email, date, title, content } = post;
  showSpinner();

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

  )
    .then( () => hideSpinner())
    .catch( error => {
      showNotification(error, false);
      hideSpinner();
    });
}

export const getPosts = () => {
  showSpinner();

  return fetch(`${databaseURL}/posts.json`, { headers })
    .then( response => response.json())
    .then( result => {
      const transformedPostsArray = Object.keys(result).map( key => ({
        ...result[key],
        id: key
      }));
      hideSpinner();
      return transformedPostsArray;
    })
    .catch( error => {
      hideSpinner();
      showNotification(error, false);
    });
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
  showSpinner();

  return axios.get(`${databaseURL}/users.json`)
    .then( response => {
      if (response) {
        hideSpinner();
        return Object.keys(response.data).map( key => ({...response.data[key], id: key}));
      }
    })
    .catch( error => {
      hideSpinner();
      showNotification(error, false);
    });
}; 

export const signIn = (email, password) => {
  return axios.post(authURL, {

    email,
    password,
    returnSecureToken: true
  })
    .then(response => {
      if (response) {
        const { idToken: token, localId } = response.data;
        LocalStorageService.setToken(token);
        LocalStorageService.setUID(localId);
        getUser().then( () => {
          hideSpinner();
          window.location.href = routes.home;
        });
      }
    })
    .catch( error => {
      hideSpinner();
      showNotification(error, false);
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
  showSpinner();

  try {
    await createAuthData(email, password);
    await createUser(user).then( response => LocalStorageService.setUserId(response.data.name));
    await signIn(email, password);
    hideSpinner();
  } catch (error) {
    hideSpinner();
    showNotification(error, false);
  }
}

export const passwordRecovery = email => {
  showSpinner();
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      hideSpinner();
      window.location.href = routes.sign_in;
    })
    .catch( error => {
      hideSpinner();
      showNotification(error, false);
    });
}

export const uploadPhoto = async (event, img_name) => {
  // const ex = event.target.files[0].name.split('.').slice(-1).join();
  const user = LocalStorageService.getPersonalData();

  await firebase.storage()
    .ref(`photos/${img_name}`)
    .put(event.target.files[0])
    .catch( error => showErrorNotification(error));
    // .then( snapshot => console.log(snapshot));

  await firebase.storage()
    .ref(`photos/${img_name}`)
    .getDownloadURL()
    .then( url => user.photo = url)
    .catch( error => showErrorNotification(error));
  await updateUser(user).then( () => refreshNewPhoto());
}


export const updateUser = async (user) => {
  axios.put(`${databaseURL}/users/${user.id}.json`, user)
    .then( () => LocalStorageService.setPersonalData(user))
}

initApi();

import firebase from 'firebase/app';
import { FIREBASE_CONFIG, databaseURL } from './api-config.js';

const headers = {
  'Content-Type': 'application/json'
}

// export const initApi = () => {
//   firebase.initializeApp(FIREBASE_CONFIG);
// }

// export const createUser = ({ username, age, creationDate }) => {
//   fetch(
//     `${databaseURL}/users.json`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username,
//         age,
//         creationDate
//       })
//     }
//   )
//     .then( response => response.json())
//     .then( result => console.log(result));
// }

// export const getUsers = () => {
//   fetch(
//     `${databaseURL}/users.json`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//   )
//     .then( response => response.json())
//     .then( result => {
//       const transformedUserArr = Object.keys(result).map( key => ({
//         ...result[key],
//         id: key
//       }));
//       console.log(transformedUserArr);
//     });
// }

// export const createTodo = ({ title, creationDate, author }) => {
//   fetch(
//     `${databaseURL}/todos.json`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         title,
//         creationDate,
//         author
//       })
//     }
//   )
//     .then( response => response.json())
//     .then( result => console.log(result));
// }

// export const removeUser = () => {
//   fetch(
//     `${databaseURL}/users/-Mbvm0cPqPvWdY6uxk-g.json`,
//     {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//   )
//     .then( response => response.json())
//     .then( result => console.log(result));
// }

// export const updateUser = () => {
//   fetch(
//     `${databaseURL}/users/-MbghcEceYni3zgmas8Y.json`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username: 'Alex',
//         age: 31,
//         creationDate: 'kuzdfg,mh ,sdkj,sjkdff'
//       })
//     }
//   )
//     .then( response => response.json())
//     .then( result => console.log(result));
// }

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

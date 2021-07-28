import { ERROR_MESSAGES } from '../shared/constants/error-messages';

export const showPasswordLengthErrorMessage = () => {
  const errorTag = document.getElementById('passwordLengthError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.password_length;
}

export const hidePasswordLengthErrorMessage = () => {
  const inputErrorTag = document.getElementById('passwordLengthError');
  inputErrorTag.style.display = 'none';
}

export const showEmailErrorMessage = () => {
  const errorTag = document.getElementById('emailError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.email;
}

export const hideEmailErrorMessage = () => {
  const inputErrorTag = document.getElementById('emailError');
  inputErrorTag.style.display = 'none';
}

export const showErrorNotification = error => {
  const notification = document.createElement('div');
  const body = document.getElementsByTagName('body')[0];
  notification.innerText = error.response ? error.response.data.error.message : error.message;
  notification.className = 'error-notification';
  body.append(notification);
  setTimeout( () => notification.style.display = 'none', 5000);
}

export const showPasswordCompareError = () => {
  const errorTag = document.getElementById('passwordsCompareError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.passwordsCompare;
}

export const hidePasswordCompareError = () => {
  const errorTag = document.getElementById('passwordsCompareError');
  errorTag.style.display = 'none';
}

export const showUserNameError = () => {
  const errorTag = document.getElementById('userNameError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.userName;
}

export const hideUserNameError = () => {
  const errorTag = document.getElementById('userNameError');
  errorTag.style.display = 'none';
}

export const showUserSurnameError = () => {
  const errorTag = document.getElementById('userSurnameError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.userSurname;
}

export const hideUserSurnameError = () => {
  const errorTag = document.getElementById('userSurnameError');
  errorTag.style.display = 'none';
}

export const showBirthdateError = () => {
  const errorTag = document.getElementById('birtdateError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.birth;
}

export const hideBirthdateError = () => {
  const errorTag = document.getElementById('birtdateError');
  errorTag.style.display = 'none';
}

export const showRecoverEmailError = () => {
  const errorTag = document.getElementById('recoverEmailError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.email;
}

export const hideRecoverEmailError = () => {
  const errorTag = document.getElementById('recoverEmailError');
  errorTag.style.display = 'none';
}
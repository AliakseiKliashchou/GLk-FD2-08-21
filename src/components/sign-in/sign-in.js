import { signIn, passwordRecovery } from '../../api/api-handlers';
import { passwordLengthValidator, emailValidator } from '../../shared/validators';
import {
  showPasswordLengthErrorMessage,
  hidePasswordLengthErrorMessage,
  showEmailErrorMessage,
  hideEmailErrorMessage,
  showErrorNotification,
  showRecoverEmailError,
  hideRecoverEmailError
} from '../../shared/error-handlers';

export const signInHandler = () => {
  const signInForm = document.querySelector('.sign-in__form');
  const signInBtn = document.getElementById('signInBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const recoverEmailInput = document.getElementById('recoverEmailInput');
  const recoverBtn = document.getElementById('recoverBtn');

  const formFields = {
    email: {
      isValid: false
    },
    password: {
      isValid: false
    }
  }

  signInBtn.setAttribute('disabled', true);
  recoverBtn.setAttribute('disabled', true);

  signInForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    signIn(email, password).catch( error => showErrorNotification(error));
  });

  passwordInput.oninput = () => {
    if (passwordLengthValidator(passwordInput.value)) {
      formFields.password.isValid = true;
      hidePasswordLengthErrorMessage();
      passwordInput.classList.remove('invalid');
    } else {
      formFields.password.isValid = false;
      passwordInput.classList.add('invalid');
    }

    checkFormValid();
  }


  passwordInput.onblur = () => {
    !passwordLengthValidator(passwordInput.value) ?
      showPasswordLengthErrorMessage() :
      hidePasswordLengthErrorMessage();
  }

  emailInput.oninput = () => {
    if (emailValidator(emailInput.value)) {
      formFields.email.isValid = true;
      hideEmailErrorMessage();
      emailInput.classList.remove('invalid');
    } else {
      formFields.email.isValid = false;
      emailInput.classList.add('invalid');
    }

    checkFormValid();
  }

  emailInput.onblur = () => {
    !emailValidator(emailInput.value) ? showEmailErrorMessage() : hideEmailErrorMessage();
  }

  recoverEmailInput.oninput = () => {
    if (emailValidator(recoverEmailInput.value)) {
      hideRecoverEmailError();
      recoverEmailInput.classList.remove('invalid');
      recoverBtn.removeAttribute('disabled');
    } else {
      recoverEmailInput.classList.add('invalid');
      recoverBtn.setAttribute('disabled', true);
    }
  }

  recoverEmailInput.onblur = () => {
    !emailValidator(recoverEmailInput.value) ? showRecoverEmailError() : hideRecoverEmailError();
  }

  recoverBtn.onclick = () => {
    passwordRecovery(recoverEmailInput.value);
  }

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every( value => value.isValid);
    isFormValid ? signInBtn.removeAttribute('disabled') : signInBtn.setAttribute('disabled', true);
  }

}

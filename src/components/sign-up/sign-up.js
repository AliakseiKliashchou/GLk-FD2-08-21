import { signUp } from '../../api/api-handlers';
import { setUserEmail } from '../../shared/ls-service';
import {
  passwordStrengthController,
  emailValidator,
  nameValidator,
  birthdateValidator,
} from '../../shared/validators';
import {
  showPasswordCompareError,
  hidePasswordCompareError,
  hideEmailErrorMessage,
  showEmailErrorMessage,
  showUserNameError,
  hideUserNameError,
  showUserSurnameError,
  hideUserSurnameError,
  showBirthdateError,
  hideBirthdateError,
} from '../../shared/error-handlers';
import { showPreloader, hidePreloader } from '../../shared/preloader';

window.onload = function () {
  let preloader = document.getElementById('preloader');
  preloader.classList.add('hide-preloader');
  setInterval(function () {
    preloader.classList.add('preloader-hidden');
  }, 990);
};

export const signUpHandler = () => {
  const signUpForm = document.querySelector('.sign-up__form');
  const password_1 = document.getElementById('password_1');
  const password_2 = document.getElementById('password_2');
  const signUpBtn = document.getElementById('signUpBtn');
  const emailInput = document.getElementById('email');
  const userNameInput = document.getElementById('userName');
  const userSurnameInput = document.getElementById('userSurname');
  const birthInput = document.getElementById('birth');
  const preloader = document.getElementById('preloader');

  const formFields = {
    userName: {
      isValid: false,
    },
    surname: {
      isValid: false,
    },
    birth: {
      isValid: true,
    },
    email: {
      isValid: false,
    },
    password_1: {
      isValid: false,
    },
    password_2: {
      isValid: false,
    },
  };

  signUpBtn.setAttribute('disabled', true);
  signUpBtn.addEventListener('click', () => {
    preloader.style.display = 'block';
  });

  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = {
      firstName: userNameInput.value,
      lastName: userSurnameInput.value,
      email: emailInput.value,
      birth: birthInput.value,
      password: password_1.value,
    };

    signUp(user);
  });

  birthInput.oninput = () => {
    // if (birthdateValidator(birthInput.value)) {
    //   formFields.birth.isValid = true;
    //   hideBirthdateError();
    // } else {
    //   formFields.birth.isValid = false;
    //   showBirthdateError();
    // }

    checkFormValid();
  };

  userNameInput.oninput = () => {
    if (nameValidator(userNameInput.value)) {
      formFields.userName.isValid = true;
      userNameInput.classList.remove('invalid');
      hideUserNameError();
    } else {
      formFields.userName.isValid = false;
      userNameInput.classList.add('invalid');
    }

    checkFormValid();
  };

  userNameInput.onblur = () => {
    !nameValidator(userNameInput.value)
      ? showUserNameError()
      : hideUserNameError();
  };

  userSurnameInput.oninput = () => {
    if (nameValidator(userSurnameInput.value)) {
      formFields.surname.isValid = true;
      userSurnameInput.classList.remove('invalid');
      hideUserSurnameError();
    } else {
      formFields.surname.isValid = false;
      userSurnameInput.classList.add('invalid');
    }

    checkFormValid();
  };

  userSurnameInput.onblur = () => {
    !nameValidator(userSurnameInput.value)
      ? showUserSurnameError()
      : hideUserSurnameError();
  };

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
  };

  emailInput.onblur = () => {
    !emailValidator(emailInput.value)
      ? showEmailErrorMessage()
      : hideEmailErrorMessage();
  };

  password_1.oninput = () => {
    formFields.password_1.isValid = passwordStrengthController(
      password_1.value
    );
    checkFormValid();
  };

  password_2.oninput = () => {
    if (
      formFields.password_1.isValid &&
      password_1.value === password_2.value
    ) {
      formFields.password_2.isValid = true;
      hidePasswordCompareError();
    } else formFields.password_2.isValid = false;

    checkFormValid();
  };

  password_2.onblur = () => {
    password_1.value !== password_2.value
      ? showPasswordCompareError()
      : hidePasswordCompareError();
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(
      (value) => value.isValid
    );
    isFormValid
      ? signUpBtn.removeAttribute('disabled')
      : signUpBtn.setAttribute('disabled', true);
  };
};

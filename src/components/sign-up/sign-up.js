import { signUp } from '../../api/api-handlers';
import { setUserEmail } from '../../shared/ls-service';
import { passwordStrengthController } from '../../shared/validators';

export const signUpHandler = () => {
  const signUpForm = document.querySelector('.sign-up__form');
  const password_1 = document.getElementById('password_1');

  // signUpForm.addEventListener('submit', event => {
  //   event.preventDefault();

  //   const name = document.getElementById('name').value;
  //   const surname = document.getElementById('surname').value;
  //   const birth = document.getElementById('birth').value;
  //   const email = document.getElementById('email').value;
  //   const password = document.getElementById('password').value;

  //   signUp(email, password)
  //     .then( response => {
  //       if (response) {
  //         console.log(response.user.email);
  //         const { email } = response.user;
  //         setUserEmail(email);
  //       }
  //     });
  // });

  password_1.oninput = () => {
    passwordStrengthController(password_1.value)
  }
}

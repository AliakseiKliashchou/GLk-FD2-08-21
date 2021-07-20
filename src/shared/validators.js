import { REGEXP } from './constants/regexp';
import { PASSWORD_STRENGTHS } from '../shared/constants/common';

export const passwordLengthValidator = password => password.match(REGEXP.PASSWORD_LENGTH);

export const emailValidator = email => email.match(REGEXP.EMAIL);


const lowerCaseCheck = password => REGEXP.LOWER_CASE.test(password);

const upperCaseCheck = password => REGEXP.UPPER_CASE.test(password);

const numberCheck = password => REGEXP.NUMBERS.test(password);

const eightCharactersCheck = password => REGEXP.EIGHT_CHARACTERS.test(password);

export const passwordStrengthController = password => {
  let passwordStrength;

  const passwordStrengthNum =
    lowerCaseCheck(password) +
    upperCaseCheck(password) +
    numberCheck(password) +
    eightCharactersCheck(password);

  Object.keys(PASSWORD_STRENGTHS).forEach( item => {
    if (PASSWORD_STRENGTHS[item] === passwordStrengthNum) {
      passwordStrength = item;
    }
  });

  const filler = document.querySelector('.sign-up__form-password-strength-status-filler');

  switch (passwordStrengthNum) {
    case 1:
      filler.classList.add('weak');
      filler.classList.remove('moderate');
      break;
    case 2:
      filler.classList.add('moderate');
      filler.classList.remove('strong');
      break;
    case 3:
      filler.classList.add('strong');
      filler.classList.remove('veryStrong');
      break;
    case 4:
      filler.classList.add('veryStrong');
      break;
    default:
      filler.classList.remove('weak');
      break;
  }

}

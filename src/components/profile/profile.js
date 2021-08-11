import { LocalStorageService } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';
import { uploadPhoto } from '../../api/api-handlers';
import { setUserInfo } from '../../shared/helpers';

export const logoutBtnHandler = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.onclick = () => {
    LocalStorageService.clearStorage();
    window.location.href = routes.sign_in;
  };
}

export const profileHandler = () => {
  const photo_input = document.getElementById('photo-input');
  setUserInfo();
  logoutBtnHandler();
  formHandler();
  photo_input.oninput = event => {
    const img_name = document.getElementById('photo-input').value;
    uploadPhoto(event, img_name);
  }
}

export const formHandler = () => {
  const { firstName, lastName, email, birth } = LocalStorageService.getPersonalData();
  const username = document.getElementById('userName');
  const userSurname = document.getElementById('userSurname');
  const emailInput = document.getElementById('email');
  const birthDayUser = document.getElementById('birth');
  const saveForm = document.querySelector('.profile__form');
  
  username.value = firstName;
  userSurname.value = lastName;
  emailInput.value = email;
  birthDayUser.value = birth;

  saveForm.addEventListener('submit', event => {
    event.preventDefault();
  })


  refreshNewPhoto();
}

export const refreshNewPhoto = () => {
  const photoBlock = document.querySelector('.profile__form-photo-img')
  photoBlock.style.backgroundImage = `url('${LocalStorageService.getPersonalData().photo}')`;
}
import { LocalStorageService } from '../shared/ls-service';

export const setUserInfo = () => {
  const photo = document.querySelector('.header__profile-photo');
  const dropdownMenuButton = document.getElementById('dropdownMenuButton');
  const userFullName = 
    `${LocalStorageService.getPersonalData().firstName} ${LocalStorageService.getPersonalData().lastName}`;

  photo.style.backgroundImage = `url("${LocalStorageService.getPersonalData().photo}")`;
  dropdownMenuButton.innerText = userFullName;
}

import {LocalStorageService } from '../shared/ls-service';

export const setUserInfo = () => {
    const drpdownmenubutton = document.getElementById('dropdownMenuButton1');
    const userfullname = `${LocalStorageService.getPersonalData().firstName}`;

    const photo = document.querySelector('.header__profile-photo');
    photo.style.backgroundImage = `url('${LocalStorageService.getPersonalData().photo}')`;
    drpdownmenubutton.innerHTML = userfullname;
}
import { clearStorage } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';

export const logoutBtnHandler = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.onclick = () => {
    clearStorage();
    window.location.href = routes.sign_in;
  };
}

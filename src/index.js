import { renderPosts, postFormHandler } from './dom-handlers/posts-renderer';
import { routes, paths } from './shared/constants/routes';
import { signInHandler } from './components/sign-in/sign-in';
import { LocalStorageService } from './shared/ls-service';
import { logoutBtnHandler } from './components/profile/profile';
import { signUpHandler } from './components/sign-up/sign-up';
import { profileHandler } from './components/profile/profile';
import './styles/styles.scss';

console.log('CHECJ')

window.onload = () => {

  console.log('CHECJ 2')

  const pathname = Object.values(paths).find( path => path === window.location.pathname );
  console.log('path', window.location);

  switch (pathname) {
    case paths.home:
      console.log('HOME');
      const token = LocalStorageService.getToken();


      if (!token) {
        window.location.href = routes.sign_in;
      } else {
        renderPosts();
        postFormHandler();
        logoutBtnHandler();
      }
      break;
    case paths.sign_in:
      signInHandler();
      break;
    case paths.sign_up:
      signUpHandler();
      break;
    case paths.profile:
      profileHandler();
    default:
      break;
  }

}

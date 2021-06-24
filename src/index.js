import { renderPosts, postFormHandler } from './dom-handlers/posts-renderer';
import { routes, paths } from './shared/constants/routes';
import { signInHandler } from './components/sign-in/sign-in';
import './styles/styles.scss';

window.onload = () => {

  const pathname = Object.values(paths).find( path => path === window.location.pathname );

  switch (pathname) {
    case paths.home:
      window.location.href = routes.sign_in;
      // renderPosts();
      // postFormHandler();
      break;
    case paths.sign_in:
      signInHandler();
      break;
    default:
      break;
  }

}

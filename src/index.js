import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { createPost } from './api/api-handlers';
import { renderPosts } from './dom-handlers/posts-renderer';
import { routes, paths } from './shared/constants/routes';
import './styles/styles.scss';

const post_form = document.getElementById('post_form');
const title_input = document.getElementById('title_input');
const post_content = document.getElementById('post_content');

const post = {
  userId: uuidv4(),
  name: 'Alex',
  email: 'test@mail.com',
  date: moment().format(),
  title: null,
  content: null
}

// post_form.addEventListener('submit', event => {
//   event.preventDefault();
//   post.title = title_input.value;
//   post.content = post_content.value;
//   createPost(post)
//     .then( () => renderPosts());
//   title_input.value = null;
//   post_content.value = null;
// });

renderPosts();

window.onload = () => {

  const pathname = Object.values(paths).find( path => path === window.location.pathname );

  // switch (pathname) {
  //   case paths.home:
  //     window.location.href = routes.sign_up;
  //     break;
  //   default:
  //     break;
  // }

}

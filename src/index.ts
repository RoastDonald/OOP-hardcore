import { UserEdit } from './views/UserEdit';
import { User } from './models/User';

const user = User.createUser({
  name: 'ANDREI',
  age: 200
});

const root = document.getElementById('root');

if (root) {
  const userInfo = new UserEdit(root, user);
  userInfo.render();
} else {
  throw new Error(`Root wasn't found`);
}

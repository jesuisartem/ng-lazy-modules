import {AuthData} from "./interfaces/auth-data.interface";

const CORRECT_AUTH_DATA: AuthData = {
  login: 'admin',
  password: 'admin',
  first_name: 'Admin',
  last_name: 'Adminov',
  role: 'admin'
}

const ANOTHER_CORRECT_AUTH_DATA: AuthData = {
  login: 'user',
  password: 'user',
  first_name: 'User',
  last_name: 'Userov',
  role: 'user'
}

const CORRECT_USERS: AuthData[] = [
  CORRECT_AUTH_DATA,
  ANOTHER_CORRECT_AUTH_DATA,
];

export {
  CORRECT_USERS,
}

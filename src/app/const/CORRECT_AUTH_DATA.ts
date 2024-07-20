import {AuthData} from "./interfaces/auth-data.interface";

const CORRECT_AUTH_DATA: AuthData = {
  login: 'admin',
  password: 'admin',
}

const ANOTHER_CORRECT_AUTH_DATA: AuthData = {
  login: 'user',
  password: 'user',
}

const CORRECT_USERS: AuthData[] = [
  CORRECT_AUTH_DATA,
  ANOTHER_CORRECT_AUTH_DATA,
];

export {
  CORRECT_USERS,
}

import {Profile} from "./profile.interface";
import {MOCK_USER_1, MOCK_USER_2, MOCK_USER_3} from "./MOCK_PROFILES";

function getRandomProfile(): Profile {
  return [MOCK_USER_1, MOCK_USER_2, MOCK_USER_3][Math.floor(Math.random() * [MOCK_USER_1, MOCK_USER_2, MOCK_USER_3].length)]
}

export {
  getRandomProfile,
}

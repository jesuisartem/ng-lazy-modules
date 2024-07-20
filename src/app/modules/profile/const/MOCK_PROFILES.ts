import {Profile} from "./profile.interface";

const MOCK_USER_1: Profile = {
  first_name: "Иван",
  last_name: "Иванов",
  email: "ivan.ivanov@example.com",
  phone_number: "9123456789",
  url: "https://ivanivanov.com"
}

const MOCK_USER_2: Profile = {
  first_name: "Мария",
  last_name: "Петрова",
  email: "maria.petrovna@example.com",
  phone_number: "9876543210"
}

const MOCK_USER_3: Profile = {
  first_name: "Алексей",
  last_name: "Сидоров",
  email: "alexey.sidorov@example.com",
  phone_number: "1234567890",
  url: "https://alexeysidorov.com"
}

export {
  MOCK_USER_1,
  MOCK_USER_2,
  MOCK_USER_3,
}

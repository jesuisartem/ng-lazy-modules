import {Message} from "primeng/api";

const SUCCESS_MESSAGE: Message = {
  summary: 'Успех!',
  detail: 'Изменения сохранены!',
  severity: 'success',
  key: 'success',
  life: 30000,
};

const ERROR_MESSAGE: Message = {
  summary: 'Ошибка!',
  detail: 'Не удалось применить изменения',
  severity: 'error',
  key: 'error',
  sticky: true,
}

export {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
}

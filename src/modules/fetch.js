// const url = 'http://localhost:3000/api/goods/';
import {modalMessage} from './deleteModal';
import {getOverlay} from './modalControl';

export const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (callback) return callback(null, data);
      return data;
    }
    if (response.status === 422 || response.status === 404 ||
      response.status > 500) {
      const warning = modalMessage();
      const h2 = warning.querySelector('.modal__text_message');
      h2.textContent = `Ошибка ${response.status}: ${response.statusText}`;
      warning.append(h2);
      const overlay = getOverlay();
      overlay.append(warning);
    } else if (response.statusText !== 200 || response.status !== 201 ||
       response.status !== 422 || response.status !== 404 &&
        response.status < 500) {
      const warning = modalMessage();
      const h2 = warning.querySelector('.modal__text_message');
      h2.textContent = 'Что-то пошло не так';
      warning.append(h2);
      const overlay = getOverlay();
      overlay.append(warning);
    }
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};
export const newfetchRequest = async (postfix, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;
    const response = await fetch(`http://localhost:3000/api/goods/?search=${postfix}`, options);
    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data);
      return data;
    }
    if (response.status === 422 || response.status === 404 ||
      response.status > 500) {
      const warning = modalMessage();
      const h2 = warning.querySelector('.modal__text_message');
      h2.textContent = `Ошибка ${response.status}: ${response.statusText}`;
      warning.append(h2);
      const overlay = getOverlay();
      overlay.append(warning);
    } else if (response.statusText !== 200 || response.status !== 201 ||
       response.status !== 422 || response.status !== 404 &&
        response.status < 500) {
      const warning = modalMessage();
      const h2 = warning.querySelector('.modal__text_message');
      h2.textContent = 'Что-то пошло не так';
      warning.append(h2);
      const overlay = getOverlay();
      overlay.append(warning);
    }
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};



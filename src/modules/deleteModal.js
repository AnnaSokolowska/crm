
export const deleteModal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay__delete', 'overlay');
  overlay.classList.add('active');

  const delModal = document.createElement('div');
  delModal.classList.add('modal__delete');
  const p = document.createElement('p');
  p.classList.add('modal__text_delete');
  p.textContent = `Вы уверены, что хотите удалить товар?`;

  const buttons = document.createElement('div');
  buttons.classList.add('modal__button_delete');

  const btnYes = document.createElement('button');
  btnYes.classList.add('modal__yes', 'modal__btn_delete');
  btnYes.textContent = 'Да';

  const btnNo = document.createElement('button');
  btnNo.classList.add('modal__no', 'modal__btn_delete');
  btnNo.textContent = 'Нет';

  buttons.append(btnYes, btnNo);

  delModal.append(p, buttons);
  overlay.append(delModal);
  document.body.append(overlay);

  return new Promise(resolve => {
    btnNo.addEventListener('click', () => {
      overlay.classList.remove('active');
      resolve(false);
    });
    overlay.addEventListener('click', e => {
      const target = e.target;
      if (target === overlay) {
        overlay.classList.remove('active');
        resolve(false);
      }
    });

    btnYes.addEventListener('click', () => {
      overlay.classList.remove('active');
      resolve(true);
    });
  });
};


export const modalMessage = () => {
  const winModal = document.createElement('div');
  winModal.classList.add('modal__overlay', 'modal__message');
  const modalClose = document.createElement('button');
  modalClose.classList.add('modal__close', 'modal__message_close');
  modalClose.insertAdjacentHTML('afterbegin', `
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" 
  stroke-linecap="round"></path></svg>`);
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('modal__image_krest');
  imageDiv.insertAdjacentHTML('afterbegin', `<svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 2L92 92" stroke="#D80101" stroke-width="3" 
  stroke-linecap="round"/>
  <path d="M2 92L92 2" stroke="#D80101" stroke-width="3" 
  stroke-linecap="round"/>
  </svg>
  `);
  const h2 = document.createElement('h2');
  h2.classList.add('modal__text_message');
  winModal.append(modalClose, imageDiv, h2);

  modalClose.addEventListener('click', () => {
    winModal.remove();
  });

  return winModal;
};


export const getOverlay = () => {
  const overlay = document.querySelector('.overlay');
  return overlay;
};

export const removeOverlay = () => {
  const overlay = getOverlay();
  overlay.classList.remove('active');
};

const getBtnAddGoods = () => {
  const btnAddGoods = document.querySelector('.panel__add-goods');
  return btnAddGoods;
};

const getBtnModalClose = () => {
  const btnModalClose = document.querySelector('.modal__close');
  return btnModalClose;
};


export const getForm = () => {
  const form = document.querySelector('.modal__form');
  form.name.setAttribute('type', 'text');
  form.description.setAttribute('type', 'text');
  form.category.setAttribute('type', 'text');
  form.units.setAttribute('type', 'text');
  form.price.setAttribute('type', 'number');
  form.count.setAttribute('type', 'number');
  form.discount_count.setAttribute('type', 'number');

  return form;
};

const getModalInput = () => {
  const form = getForm();
  const modalInput = form.querySelectorAll('.modal__input');
  modalInput.forEach(Element => Element.toggleAttribute('required'));
  return modalInput;
};

const clickModalClose = () => {
  const overlay = getOverlay();
  const btnModalClose = getBtnModalClose();
  btnModalClose.addEventListener('click', () => {
    overlay.classList.toggle('active');
  });
};


const getVendore = () => {
  const vendorCode = document.querySelector('.vendor-code__id');
  return vendorCode;
};

const getRandomNumber = () => {
  const randomId = Math.floor(Math.random() * 99000000000000) + 1;
  return randomId;
};

const getDiscountCount = () => {
  const form = getForm();
  const discountCount = form.discount_count;

  form.discount.addEventListener('change', () => {
    discountCount.toggleAttribute('disabled');
    discountCount.value = '';
  });
};

const openModal = () => {
  const form = getForm();
  const overlay = getOverlay();
  overlay.classList.add('active');
  const vendorCode = getVendore();
  const randomId = getRandomNumber();
  getDiscountCount();
  vendorCode.textContent = randomId;
  form.total.textContent = '';
  form.price.addEventListener('blur', () => {
    form.total.textContent = Number(form.price.value) * form.count.value;
  });
};

export const closeModal = () => {
  const overlay = getOverlay();
  overlay.classList.remove('active');
};

const clickBtnAdd = () => {
  const btnAddGoods = getBtnAddGoods();
  const overlay = getOverlay();
  btnAddGoods.addEventListener('click', openModal);
  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target === overlay || target.classList.contains('close')) {
      closeModal();
    }
  });
};

export const initModal = () => {
  getModalInput();
  clickBtnAdd();
  clickModalClose();
};



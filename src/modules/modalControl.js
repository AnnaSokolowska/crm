

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
  form.title.setAttribute('type', 'text');
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


export const getDiscountCount = () => {
  const form = getForm();
  const discountCount = form.discount_count;

  form.discount.addEventListener('change', () => {
    discountCount.toggleAttribute('disabled');
    discountCount.value = '';
  });
};

export const openModal = () => {
  const form = getForm();
  console.log(form);
  const overlay = getOverlay();
  overlay.classList.add('active');
  const vendorCode = getVendore();
  getDiscountCount();
  vendorCode.textContent = '';
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

const clickAddImage = () => {
  const form = getForm();
  const file = document.getElementById('image');
  file.insertAdjacentHTML('afterend', '<img class="preview"></img>');
  file.insertAdjacentHTML('beforebegin',
    `<p class="visually-hidden modal__texts">
  Изображение не должно превышать размер 1 Мб</p>`);
  const p = document.querySelector('.modal__texts');
  const preview = form.querySelector('.preview');
  file.addEventListener('change', () => {
    if (file.files.length > 0) {
      const src = URL.createObjectURL(file.files[0]);
      if (file.files[0].size < 1000000) {
        p.classList.add('visually-hidden');
        preview.style.cssText = `
        display: grid;
        grid-column-start: 1;
        grid-column-end: 3;
        `;
        preview.src = src;
        console.log(file.files[0]);
      } else {
        preview.src = '';
        p.classList.remove('visually-hidden');
      }
    }
  });
};
const input = document.getElementById('category');

const addCategory = async () => {
  input.setAttribute('list', 'category-list');
  const dataList = document.createElement('datalist');
  dataList.setAttribute('id', 'category-list');
  input.insertAdjacentElement('afterend', dataList);
  const result = await fetch('http://localhost:3000/api/category/');
  const data = await result.json();
  const options = data.map(item => {
    const option = document.createElement('option');
    option.setAttribute('value', `${item}`);
    return option;
  });
  dataList.append(...options);
  return options;
};


export const initModal = () => {
  getModalInput();
  clickBtnAdd();
  clickModalClose();
  clickAddImage();
  addCategory();
};



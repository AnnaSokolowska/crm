import {createRow, getTableBody, getCrmTotalPrice, setTotalPrice,
  getTableRow}
  from './modules/getElements.js';
import {getOverlay, removeOverlay, closeModal, getForm, initModal}
  from './modules/modalControl.js';


const mass = [
  {
    'id': 2,
    'name': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч.',
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 3,
    'name': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным.',
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 4,
    'name': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является ',
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  }];


const renderGoods = (mass) => {
  const tableBody = getTableBody();
  for (let i = 0; i < mass.length; i++) {
    const tableRows = createRow(mass[i]);
    tableRows.classList.add('table__row');
    tableBody.append(tableRows);
  }

  tableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      const rowDel = target.closest('.table__row');
      const delCost = Number(rowDel.
        querySelector('.table__cell-total').textContent.slice(1));
      const a = rowDel.querySelector('.table__cell_name');
      const b = Number(a.getAttribute('data-id'));
      const i = mass.findIndex((item) => item.id === b);
      mass.splice(i, 1);
      target.closest('.table__row').remove();
      const crmTotalPrice = getCrmTotalPrice();
      crmTotalPrice.textContent = Number(crmTotalPrice.textContent) -
      delCost;
      console.log(mass);
    }
    if (target.closest('.table__btn_pic')) {
      const left = (screen.width - 800) / 2;
      const top = (screen.height - 600) / 2;
      const btnPicUrl = target.closest('.table__btn_pic').
        getAttribute('data-pic');
      console.log(btnPicUrl);
      open(`${btnPicUrl}`, '',
        `left=${left},top=${top},width=800,height=600`);
    }
    const tableCellNumber = tableBody.querySelectorAll('.table__cell_number');
    for (let i = 0; i < mass.length; i++) {
      tableCellNumber[i].textContent = `${i + 1}`;
    }
  });
};


const addGoods = obj => {
  mass.push(obj);
  console.log('mass:', mass);
};


const addGoodsPage = (obj, tableBody) => {
  tableBody.append(createRow(obj));
  const tableRows = tableBody.lastElementChild;
  tableRows.className = 'table__row';
};

const setCellNumber = (mass) => {
  const tableBody = getTableBody();
  const tableCellNumber = tableBody.querySelectorAll('.table__cell_number');
  for (let i = 0; i < mass.length; i++) {
    tableCellNumber[i].textContent = `${i + 1}`;
  }
};


const formControl = (form, tableBody, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newObj = Object.fromEntries(formData);
    newObj.id = document.querySelector('.vendor-code__id').textContent;


    addGoodsPage(newObj, tableBody);
    addGoods(newObj);
    setCellNumber(mass);
    form.reset();
    closeModal();
  });
};


const init = () => {
  const overlay = getOverlay();
  removeOverlay(overlay);
  const tableBody = getTableBody();
  const form = getForm();
  setTotalPrice();
  getTableRow();
  initModal();
  formControl(form, tableBody, closeModal);
  renderGoods(mass);
  setCellNumber(mass);
};

init();

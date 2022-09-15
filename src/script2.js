import {createRow, getTableBody, getCrmTotalPrice, setTotalPrice,
  getTableRow}
  from './modules/getElements.js';
import {getOverlay, removeOverlay, closeModal, getForm, initModal}
  from './modules/modalControl.js';
import {deleteModal} from './modules/deleteModal.js';
import {fetchRequest} from './modules/fetch.js';
import {editModal} from './modules/modalEdit.js';
import {initSearch} from './modules/search.js';

import './css/index.css';


const loadData = async (cb) => {
  const data = await fetch('http://localhost:3000/api/goods/');
  const mass = await data.json();
  console.log(mass);
  return mass;
};


export const renderGoods = async () => {
  const mass = await loadData();
  const tableBody = getTableBody();
  for (let i = 0; i < mass.length; i++) {
    const tableRows = createRow(mass[i]);
    tableRows.classList.add('table__row');
    tableBody.append(tableRows);
  }

  tableBody.addEventListener('click', async ({target}) => {
    if (target.closest('.table__btn_pic')) {
      const left = (screen.width - 800) / 2;
      const top = (screen.height - 600) / 2;
      const btnPicUrl = target.closest('.table__btn_pic').
        getAttribute('data-pic');
      console.log(btnPicUrl);
      open(`${btnPicUrl}`, '',
        `left=${left},top=${top},width=800,height=600`);
    }
  });
};


const editControl = () => {
  const tableBody = getTableBody();
  tableBody.addEventListener('click', async ({target}) => {
    if (target.closest('.table__btn_edit')) {
      const rowEdit = target.closest('.table__row');
      const editId = rowEdit.querySelector('.table__cell_number').textContent;
      const result = await fetchRequest(`http://localhost:3000/api/goods/${editId}`, {
        callback: editModal,
      });
      if (result) {
        while (tableBody.rows[0]) {
          tableBody.deleteRow(0);
        }
        const crmTotalPrice = getCrmTotalPrice();
        crmTotalPrice.textContent = '0';
        renderGoods();
      }
    }
  });
};

const delControl = () => {
  const tableBody = getTableBody();
  tableBody.addEventListener('click', async ({target}) => {
    if (target.closest('.table__btn_del')) {
      const rowDel = target.closest('.table__row');
      const delCost = Number(rowDel.
        querySelector('.table__cell-total').textContent.slice(1));
      const b = rowDel.querySelector('.table__cell_number').textContent;

      const checkDelete = await fetchRequest(`http://localhost:3000/api/goods/${b}`, {
        callback: deleteModal,
      });
      console.log(checkDelete);
      if (checkDelete) {
        await fetch(`http://localhost:3000/api/goods/${b}`, {
          method: 'DELETE',
        });
        target.closest('.table__row').remove();
        const crmTotalPrice = getCrmTotalPrice();
        crmTotalPrice.textContent = Number(crmTotalPrice.textContent) -
        delCost;
      }
    }
  });
};


const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});

const formControl = (form, tableBody, closeModal) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const overlay = getOverlay();
    const formData = new FormData(e.target);

    const newObj = Object.fromEntries(formData);
    newObj.image = await toBase64(newObj.image);
    await fetchRequest('http://localhost:3000/api/goods/', {
      method: 'POST',
      body: {
        title: newObj.title,
        description: newObj.description,
        category: newObj.category,
        price: newObj.price,
        discount: newObj.discount,
        count: newObj.count,
        units: newObj.units,
        image: newObj.image,
      },
      callback(error, data) {
        if (error) {
          console.warn(error, data);
        } else {
          while (tableBody.rows[0]) {
            tableBody.deleteRow(0);
          }
          const crmTotalPrice = getCrmTotalPrice();
          crmTotalPrice.textContent = '0';
          renderGoods();
          form.reset();
          closeModal();
          overlay.remove();
        }
      },
    });
    console.log(newObj);
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
  renderGoods();
  editControl();
  initSearch();
  delControl();
};

init();

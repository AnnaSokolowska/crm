'use strict';

const overlay = document.querySelector('.overlay');
overlay.classList.toggle('active');


const tableBody = document.querySelector('.table__body');
const createRow = (obj) => {
  const tableRow = document.createElement('tr');

  const tableCellNumber = document.createElement('td');
  tableCellNumber.className = 'table__cell';
  const previousRow = tableBody.lastElementChild;
  const n = Number(previousRow.firstElementChild.textContent);
  tableCellNumber.textContent = n + 1;
  tableRow.appendChild(tableCellNumber);

  const tableCellName = document.createElement('td');
  tableCellName.classList.add(
    'table__cell', 'table__cell_left', 'table__cell_name');
  const id = obj.id;
  tableCellName.setAttribute('data-id', id);
  const span = document.createElement('span');
  span.classList.add('table__cell-id');
  const spanText = `id:${id}`;
  span.insertAdjacentText('afterbegin', spanText);
  tableCellName.appendChild(span);

  const productName = obj.title;
  tableCellName.insertAdjacentText('beforeend', productName);
  tableRow.appendChild(tableCellName);

  const tableCellCategory = document.createElement('td');
  tableCellCategory.classList.add('table__cell', 'table__cell_left');
  const category = obj.category;
  tableCellCategory.insertAdjacentText('afterbegin', category);
  tableRow.appendChild(tableCellCategory);

  const tableCellUnit = document.createElement('td');
  tableCellUnit.className = 'table__cell';
  const unit = obj.units;
  tableCellUnit.insertAdjacentText('afterbegin', unit);
  tableRow.appendChild(tableCellUnit);

  const tableCellAmount = document.createElement('td');
  tableCellAmount.className = 'table__cell';
  const amount = obj.count;
  tableCellAmount.insertAdjacentText('afterbegin', amount);
  tableRow.appendChild(tableCellAmount);

  const tableCellPrice = document.createElement('td');
  tableCellPrice.className = 'table__cell';
  const price = obj.price;
  tableCellPrice.insertAdjacentText('afterbegin', `$${price}`);
  tableRow.appendChild(tableCellPrice);


  const tableCellTotalCost = document.createElement('td');
  tableCellTotalCost.className = 'table__cell';
  const totalCost = amount * price;
  tableCellTotalCost.insertAdjacentText('afterbegin', `$${totalCost}`);
  tableRow.appendChild(tableCellTotalCost);

  const tableCellBtn = document.createElement('td');
  tableCellBtn.classList.add('table__cell', 'table__cell_btn-wrapper');
  const tableBtnPic = document.createElement('button');
  tableBtnPic.classList.add('table__btn', 'table__btn_pic');

  tableCellBtn.appendChild(tableBtnPic);
  const tableBtnEdit = document.createElement('button');
  tableBtnEdit.classList.add('table__btn', 'table__btn_edit');
  tableCellBtn.appendChild(tableBtnEdit);
  const tableBtnDel = document.createElement('button');
  tableBtnDel.classList.add('table__btn', 'table__btn_del');
  tableCellBtn.appendChild(tableBtnDel);
  tableRow.appendChild(tableCellBtn);
  return tableRow;
};

const renderGoods = (mass) => {
  for (let i = 0; i < mass.length; i++) {
    const tableRows = createRow(mass[i]);
    tableRows.classList.add('table__row');
    tableBody.append(tableRows);
  }
  tableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      const rowDel = target.closest('.table__row');
      const a = rowDel.querySelector('.table__cell_name');
      const b = Number(a.getAttribute('data-id'));
      const i = mass.findIndex((item) => item.id === b);
      mass.splice(i, 1);
      target.closest('.table__row').remove();
      console.log(mass);
    }
  });
};

const btnAddGoods = document.querySelector('.panel__add-goods');
const btnModalClose = document.querySelector('.modal__close');
const modalWindow = document.querySelector('.overlay__modal');


btnAddGoods.addEventListener('click', () => {
  overlay.classList.add('active');
});
btnModalClose.addEventListener('click', () => {
  overlay.classList.toggle('active');
});
overlay.addEventListener('click', e => {
  const target = e.target;
  if (target === overlay || target.classList.contains('close')) {
    overlay.classList.remove('active');
  }
});



renderGoods([
  {
    'id': 2,
    'title': 'Радиоуправляемый автомобиль Cheetan',
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
    'title': 'ТВ приставка MECOOL KI',
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
    'title': 'Витая пара PROConnect 01-0043-3-25',
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
  }]);


export const getCrmTotalPrice = () => {
  const crmTotalPrice = document.querySelector('.crm__total-price');
  return crmTotalPrice;
};

export const setTotalPrice = () => {
  const crmTotalPrice = getCrmTotalPrice();
  crmTotalPrice.textContent = '0';
};


export const getTableBody = () => {
  const tableBody = document.querySelector('.table__body');
  return tableBody;
};

export const getTableRow = () => {
  const tableBody = getTableBody();
  const tableRows = tableBody.querySelectorAll('tr');
  tableRows.forEach(item => item.remove());
};


export const createRow = (obj) => {
  const tableRow = document.createElement('tr');
  tableRow.classList.add('table__row');

  const tableCellIdNumber = document.createElement('td');
  tableCellIdNumber.classList.add('table__cell',
    'table__cell_number');
  const id = obj.id;
  tableCellIdNumber.setAttribute('data-id', id);
  tableCellIdNumber.insertAdjacentText('beforeend', id);
  tableRow.appendChild(tableCellIdNumber);


  const tableCellName = document.createElement('td');
  tableCellName.classList.add(
    'table__cell', 'table__cell_left', 'table__cell_name');
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
  tableCellTotalCost.classList.add('table__cell', 'table__cell-total');
  const totalCost = amount * price;
  tableCellTotalCost.insertAdjacentText('afterbegin', `$${totalCost}`);
  tableRow.appendChild(tableCellTotalCost);

  const crmTotalPrice = getCrmTotalPrice();
  const totalPrice = totalCost + Number(crmTotalPrice.textContent);
  crmTotalPrice.textContent = totalPrice;


  const tableCellBtn = document.createElement('td');
  tableCellBtn.classList.add('table__cell', 'table__cell_btn-wrapper');
  const tableBtnPic = document.createElement('button');
  tableBtnPic.setAttribute('data-pic', `http://localhost:3000/API/${obj.image}`);
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


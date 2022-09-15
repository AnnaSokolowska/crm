import {newfetchRequest} from './fetch';
import {getTableBody} from './getElements';
import {createRow} from './getElements';
import {getCrmTotalPrice} from './getElements';


const inputSearch = document.querySelector('.panel__input');

const showSearch = async () => {
  const tableBody = getTableBody();
  const search = await newfetchRequest(`${inputSearch.value}`, {
    method: 'get',
  });
  while (tableBody.rows[0]) {
    tableBody.deleteRow(0);
  }
  const crmTotalPrice = getCrmTotalPrice();
  crmTotalPrice.textContent = '0';
  search.forEach(item => {
    const tableRows = createRow(item);
    tableRows.classList.add('table__row');
    tableBody.append(tableRows);
  });
};
const debounce = (fn, msec) => {
  let lastCall = 0;
  let lastCallTimer = NaN;

  return (...args) => {
    const previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && ((lastCall - previousCall <= msec))) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => fn(...args), msec);
  };
};
const showSearchDebounce = debounce(showSearch, 300);

export const initSearch = () => {
  inputSearch.addEventListener('change', showSearchDebounce);
};



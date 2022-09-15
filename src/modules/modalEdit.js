import {fetchRequest} from './fetch';


export const editModal = async (err, data) => {
  const formChange = document.querySelector('.modal__form_change');
  const overlay = document.querySelector('.overlay__edit');
  overlay.classList.add('active');
  const editModalClose = document.querySelector('.modal__close_edit');
  const idCode = document.querySelector('.id__edit');
  const preview = document.querySelector('.preview__edit');
  preview.style.cssText = `
        display: grid;
        grid-column-start: 1;
        grid-column-end: 3;
        `;
  console.log(preview);
  preview.setAttribute('src', `http://localhost:3000/${data.image}`);
  idCode.textContent = `${data.id}`;
  formChange.title.value = data.title;
  formChange.description.value = data.description;
  formChange.category.value = data.category;
  formChange.price.value = data.price;
  formChange.units.value = data.units;
  formChange.count.value = data.count;
  formChange.total.textContent = formChange.total.textContent =
  Number(formChange.price.value) * formChange.count.value;
  formChange.price.addEventListener('change', () => {
    formChange.total.textContent =
    Number(formChange.price.value) * formChange.count.value;
  });
  formChange.count.addEventListener('change', () => {
    formChange.total.textContent =
    Number(formChange.price.value) * formChange.count.value;
  });
  if (data.discount !== 0) {
    const discountCount = formChange.querySelector('.modal__input_discount');
    discountCount.setAttribute('disabled', 'false');
    formChange.discount_count.value = data.discount;
  } else {
    const discountCount = formChange.discount_count;
    formChange.discount.addEventListener('change', () => {
      discountCount.toggleAttribute('disabled');
      discountCount.value = '';
    });
  }
  return new Promise(resolve => {
    editModalClose.addEventListener('click', () => {
      resolve(false);
      overlay.classList.remove('active');
      formChange.reset();
    });
    overlay.addEventListener('click', e => {
      const target = e.target;
      if (target === overlay) {
        resolve(false);
        overlay.classList.remove('active');
        formChange.reset();
      }
    });
    formChange.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newObj = Object.fromEntries(formData);
      newObj.id = data.id;
      await fetchRequest(`http://localhost:3000/api/goods/${newObj.id}`, {
        method: 'PATCH',
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
            formChange.reset();
            resolve(true);
            overlay.classList.remove('active');
          }
        },
      });
    });
  });
};

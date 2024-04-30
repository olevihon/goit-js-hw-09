import '../css/2-form.css';

const FEEDBACK_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const { email, message } = refs.form.elements;

let formData = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY)) || {};

if (formData) {
  email.value = formData.email || '';
  message.value = formData.message || '';
}

const onFormInput = e => {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(formData));
};

const onFormSubmit = e => {
  e.preventDefault();

  if (email.value === '' || message.value === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  formData = {};
  e.target.reset();
};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);

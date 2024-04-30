import '../css/2-form.css';

const FEEDBACK_STORAGE_KEY = 'feedback-form-state';

const formRefs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea'),
};

const formData = {
  email: '',
  message: '',
};

const storedFormData = localStorage.getItem(FEEDBACK_STORAGE_KEY);
if (storedFormData) {
  const formData = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY));
  formRefs.input.value = formData.email;
  formRefs.message.value = formData.message;
}

const onFormInput = e => {
  e.preventDefault();
  const { email, message } = e.currentTarget.elements;

  // Prevent pollute user localStorage
  if (storedFormData && email.value === '' && message.value === '') {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
    return;
  }

  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(formData));
};

const onFormSubmit = e => {
  e.preventDefault();

  const form = e.currentTarget;
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.elements.email.value = '';
  form.elements.message.value = '';
  e.currentTarget.reset();
};

formRefs.form.addEventListener('input', onFormInput);
formRefs.form.addEventListener('submit', onFormSubmit);

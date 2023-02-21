import onChange from 'on-change';

export default (state, elements) => onChange(state, (path, value) => {
  const { form, input, feedbackElement } = elements;

  if (path === 'rssForm.state') {
    input.classList.remove('is-invalid');
    feedbackElement.classList.remove('text-success', 'text-danger');
    if (value === 'invalid') {
      input.classList.add('form-control', 'w-100', 'is-invalid');
      feedbackElement.classList.add('text-danger');
      feedbackElement.textContent = 'Ссылка должна быть валидным URL';
    } else if (value === 'valid') {
      feedbackElement.classList.add('text-success');
      feedbackElement.textContent = 'Rss успешно добавлены';
      form.reset();
      form.focus();
    }
  }
});

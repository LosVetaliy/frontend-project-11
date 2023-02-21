import { object, string } from 'yup';

export default (watchedState, elements) => {
  const { rssForm, feeds, posts } = watchedState;
  const {
    form,
    input,
    feedbackElement,
  } = elements;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const schema = object({
      url: string()
        .url()
        .nullable()
        .notOneOf(feeds.map(({ url }) => url), 'state.rssform.errors.exist'),
    });
    const url = new FormData(e.target).get('url');
    console.log(url);
    schema
      .validate({ url })
      .then(() => {
        rssForm.state = 'valid';
      })
      .catch(() => {
        rssForm.state = 'invalid';
      });
  });
};

import {
  object, string, ValidationError, setLocale,
} from 'yup';
import _ from 'lodash';

export default (watchedState, elements, i18nextInstance) => {
  const { rssForm, feeds, posts } = watchedState;
  const { form, input, feedbackElement } = elements;

  setLocale({
    mixed: {
      default: 'field_invalid',
      required: 'field_required',
    },
    string: {
      url: 'feedback.notUrl',
    },
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const schema = object({
      url: string().url().nullable().notOneOf((feeds), 'feedback.includYet'),
    });

    const url = new FormData(e.target).get('url');

    schema
      .validate({ url })
      .then(() => {
        rssForm.state = 'valid';
        feeds.push(url);
        rssForm.feedback = ['feedback.isValid'];
      })
      .catch((error) => {
        rssForm.state = 'invalid';
        if (error instanceof ValidationError) {
          rssForm.feedback = [...error.errors];
        } else if (error instanceof TypeError) {
          rssForm.feedback = ['feedback.notRss'];
        } else {
          rssForm.feedback = [error.message];
        }
      });
  });
  rssForm.state = 'ready';
};

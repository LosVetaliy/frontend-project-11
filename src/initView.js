import _ from 'lodash';
import axios from 'axios';
import {
  object, string, ValidationError, setLocale,
} from 'yup';
import generateId from './idGenerator.js';
import parser from './parse.js';

export default (watchedState, elements, i18nextInstance) => {
  const {
    rssForm, feeds, posts,
  } = watchedState;
  const {
    form,
    input,
    feedbackElement,
    containerPosts,
    containerFeeds,
    // cardBorder,
  } = elements;
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
      url: string()
        .url()
        .nullable()
        .notOneOf(feeds.map(({ url }) => url), 'feedback.includYet'),
    });
    const url = new FormData(e.target).get('url');

    const makeProxy = (url) => {
      const proxy = new URL('/get', 'https://allorigins.hexlet.app');
      proxy.searchParams.set('disableCache', 'true');
      proxy.searchParams.set('url', url);
      return proxy.toString();
    };

    schema
      .validate({ url })
      .then(() => axios.get(makeProxy(url)))
      .then((response) => {
        const { rssFeeds, rssPosts } = parser(response.data.contents);
        const feedId = generateId();
        feeds.push({ id: feedId, url, ...rssFeeds });
        console.log(feeds);
        posts.push(rssPosts.map(({ title, link }) => {
          const post = {
            id: generateId(), feedId, title, link, visted: false,
          };
          return post;
        }));
        rssForm.state = 'valid';
        rssForm.feedback = ['feedback.isValid'];
      })
      .catch((error) => {
        rssForm.state = 'invalid';
        if (error instanceof ValidationError) {
          rssForm.feedback = [...error.errors];
        } else if (error instanceof TypeError) {
          rssForm.feedback = ['feedback.notRss'];
        } else if (error.message === 'Network Error') {
          rssForm.feedback = ['netWorkError'];
        } else {
          rssForm.feedback = [error.message];
        }
      });
  });
  rssForm.state = 'ready';
};

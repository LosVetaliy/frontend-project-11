import i18next from 'i18next';
import watch from './view.js';
import initView from './initView.js';
import locales from './locales/ru.js';

const init = () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: locales,
  });

  const state = {
    rssForm: {
      state: 'ready',
      feedback: [],
    },
    feeds: [],
    posts: [],
  };
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    feedbackElement: document.querySelector('.feedback'),
  };
  const watched = watch(state, elements, i18nextInstance);

  initView(watched, elements, i18nextInstance);
};

export default init;

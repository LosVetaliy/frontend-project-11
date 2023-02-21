import watch from './view.js';
import initView from './initView.js';

const init = () => {
  const state = {
    rssForm: {
      state: 'ready',
    },
    feeds: [],
    posts: [],
  };
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    feedbackElement: document.querySelector('.feedback'),
  };
  const watched = watch(state, elements);

  initView(watched, elements);
};

export default init;

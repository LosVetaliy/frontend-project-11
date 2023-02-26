/* eslint-disable array-callback-return */
import _ from 'lodash';
import onChange from 'on-change';

export default (state, elements, i18nextInstance) => onChange(state, (path, value) => {
  const {
    form,
    input,
    feedbackElement,
    containerPosts,
    containerFeeds,
  } = elements;

  if (path === 'rssForm.state') {
    input.classList.remove('is-invalid');
    feedbackElement.classList.remove('text-success', 'text-danger');
    if (value === 'invalid') {
      input.classList.add('form-control', 'w-100', 'is-invalid');
      feedbackElement.classList.add('text-danger');
    } else if (value === 'valid') {
      feedbackElement.classList.add('text-success');

      form.reset();
      form.focus();
    }
  }

  if (path === 'rssForm.feedback') {
    feedbackElement.textContent = value.map((message) => i18nextInstance.t(message)).join(',');
  }

  if (path === 'feeds') {
    containerFeeds.innerHTML = '';
    const cardBorder = document.createElement('div');
    cardBorder.classList.add('card', 'border-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBorder.prepend(cardBody);
    const feedsHead = document.createElement('h2');
    feedsHead.classList.add('card-title', 'h4');
    feedsHead.textContent = i18nextInstance.t('feeds.header');
    cardBody.prepend(feedsHead);
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    state.feeds.map((feed) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'border-end-0');
      const h3 = document.createElement('h3');
      h3.classList.add('h6', 'm-0');
      h3.textContent = feed.title;
      li.prepend(h3);
      const p = document.createElement('p');
      p.classList.add('m-0', 'small', 'text-black-50');
      p.textContent = feed.description;
      li.append(p);
      ul.prepend(li);
      return li;
    });
    cardBorder.append(ul);
    containerFeeds.append(cardBorder);
  }

  if (path === 'posts') {
    containerPosts.innerHTML = '';
    const cardBorder = document.createElement('div');
    cardBorder.classList.add('card', 'border-0');
    containerPosts.prepend(cardBorder);
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBorder.prepend(cardBody);
    const postsHead = document.createElement('h2');
    postsHead.classList.add('cadr-title', 'h4');
    postsHead.textContent = i18nextInstance.t('posts.header');
    cardBody.prepend(postsHead);

    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounder-0');
    cardBorder.append(ul);
    state.posts.map((post) => {
      post.map((p) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
        const a = document.createElement('a');
        a.setAttribute('href', p.link);
        a.classList.add('font-weight-bold');
        a.setAttribute('data-id', p.id);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        a.textContent = p.title;
        li.prepend(a);
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        button.setAttribute('type', 'button');
        button.setAttribute('data-id', p.id);
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#modal');
        button.setAttribute('data-bs-id', p.id);
        button.setAttribute('data-bs-title', p.title);
        button.setAttribute('data-bs-description', p.description);
        button.setAttribute('data-bs-link', p.link);
        button.textContent = i18nextInstance.t('posts.buttonShow');
        li.append(button);
        ul.prepend(li);
      });
    });
  }
});

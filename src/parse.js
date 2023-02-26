const parser = (contents) => {
  const dom = new DOMParser();
  const doc = dom.parseFromString(contents, 'text/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('ParserError');
  }
  const url = doc.querySelector('channel > link');
  const title = doc.querySelector('channel > title');
  const description = doc.querySelector('channel > description');
  const feed = {
    link: url.textContent,
    title: title.textContent,
    description: description.textContent,
  };
  const data = { feed, posts: [] };
  const items = doc.querySelectorAll('item');
  items.forEach((item) => {
    const itemTitle = item.querySelector('title');
    const itemUrl = item.querySelector('link');
    const itemDescription = item.querySelector('description');
    const post = {
      title: itemTitle.textContent,
      description: itemDescription.textContent,
      link: itemUrl.textContent,
    };
    data.posts.push(post);
  });
  return data;
};

export default parser;

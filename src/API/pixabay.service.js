const AUTH_KEY = '29946352-1a4291eb7954147c8b1f721f5';

export const pixabayFetchAPI = (query, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${AUTH_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error('Більше немає картинок за таким запитом =(')
    );
  });
};

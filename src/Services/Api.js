export const fetchImages = ({ searchQuery, page }) => {
  const Api = '27492943-191b6e85ce2b26a7ce823ae12';
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${Api}`,
  )
    .then(response => response.json())
    .then(data => {
      if (data.total === 0) {
        return Promise.reject(
          new Error(
            `U've been looking for ${searchQuery}. We don't have such pictures`,
          ),
        );
      } else {
        return data.hits;
      }
    });
};

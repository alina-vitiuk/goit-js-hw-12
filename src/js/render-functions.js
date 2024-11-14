import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchPhotos = (searchedQuery, page, perPage) => {
  const axoisOptions = {
    params: {
      key: '47019110-2ca5c662ec937047bff385c25',
      q: searchedQuery,
      orientation: 'horizontal',
      page: page,
      per_page: perPage,
      safesearch: true,
    },
  };

  return axios.get(`/api/`, axoisOptions);
};

export const createGalleryCardTemplate = imgInfo => {
  return `<li class="gallery-item">
          <a class="gallery-link" href="${imgInfo.largeImageURL}">
            <img
              class="gallery-image"
              src="${imgInfo.webformatURL}"
              alt="${imgInfo.tags}"
              width="360"
            />
          </a>
          <div class="main-block">
            <div class="block">
              <h2 class="tittle">Likes</h2>
              <p class="info-titel">${imgInfo.likes}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Views</h2>
              <p class="info-titel">${imgInfo.views}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Comments</h2>
              <p class="info-titel">${imgInfo.comments}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Downloads</h2>
              <p class="info-titel">${imgInfo.downloads}</p>
            </div>
          </div>
        </li>`;
};

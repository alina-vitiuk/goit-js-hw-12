// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/render-functions.js';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const lastText = document.querySelector('.text');

let currentPage = 1;
let searchedValue = '';
let cardHeight = 0;
let maxPages = 0;
let perPage = 15;
loader.style.display = 'none';

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    searchedValue = searchFormEl.elements.user_query.value;

    loader.style.display = 'block';

    const response = await fetchPhotos(searchedValue, currentPage, perPage);

    loader.style.display = 'none';
    maxPages = response.data.totalHits / perPage;
    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
    }
    console.log(response);

    let galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.innerHTML = galleryCardsTemplate;
    // searchFormEl.reset();

    const refreshPage = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    refreshPage.refresh();

    const galleryCardEl = galleryEl.querySelector('li');

    cardHeight = galleryCardEl.getBoundingClientRect().height;

    loadMoreBtnEl.classList.remove('is-hidden');
  } catch (error) {
    loader.style.display = 'none';
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage++;
    if (currentPage === maxPages) {
      loadMoreBtnEl.classList.add('is-hidden');
      lastText.style.display = 'block';
    }
    const response = await fetchPhotos(searchedValue, currentPage, perPage);
    let galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

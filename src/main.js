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
    currentPage = 1;

    lastText.style.display = 'none';

    searchedValue = searchFormEl.elements.user_query.value;

    loader.style.display = 'block';

    const response = await fetchPhotos(searchedValue, currentPage, perPage);

    const isWhiteSpaceString = str => !str.replace(/\s/g, '').length;
    if (isWhiteSpaceString(searchedValue)) {
      iziToast.error({
        message: 'Please fill out the form!',
        position: 'bottomRight',
      });
      loader.style.display = 'none';
      return;
    }
    if (response.data.totalHits <= perPage) {
      loadMoreBtnEl.style.visibility = 'hidden';
      lastText.style.display = 'block';
    } else {
      loadMoreBtnEl.style.visibility = 'visible';
    }
    loader.style.display = 'none';
    maxPages = Math.floor(response.data.totalHits / perPage);

    console.log(maxPages);
    if (response.data.hits.length === 0) {
      loadMoreBtnEl.style.visibility = 'hidden';
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
    }

    let galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.innerHTML = galleryCardsTemplate;

    const refreshPage = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    refreshPage.refresh();

    const galleryCardEl = galleryEl.querySelector('li');

    cardHeight = galleryCardEl.getBoundingClientRect().height;
  } catch (error) {
    loader.style.display = 'none';
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  if (onLoadMoreBtnClick.cantClick) return;
  onLoadMoreBtnClick.cantClick = true;
  try {
    currentPage++;
    const response = await fetchPhotos(searchedValue, currentPage, perPage);
    let galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);
    const refreshPage = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    refreshPage.refresh();
    if (currentPage === maxPages) {
      loadMoreBtnEl.style.visibility = 'hidden';
      lastText.style.display = 'block';
      onLoadMoreBtnClick.cantClick = false;
    }
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    setTimeout(() => {
      onLoadMoreBtnClick.cantClick = false;
    }, 200);
  } catch (err) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'bottomRight',
    });
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

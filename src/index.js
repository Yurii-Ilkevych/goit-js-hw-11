import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from "axios"
const optionMessage = {
  position: 'right-top',
  timeout: 2250,
  fontSize: '20px',
  borderRadius: '15px',
};
const API_KEY = "35606750-af8374c970d110a408f6cc0ed"
const BASE_URL = 'https://pixabay.com/api/';
const refs = {
  formSearch: document.querySelector('#search-form'),
  input: document.querySelector('[type="text"]'),
  btnSubmit: document.querySelector("[type='submit']"),
  btnLoadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

const lightbox = new SimpleLightbox('.gallery a');
refs.formSearch.addEventListener('submit', getTextForSearch);
refs.btnLoadMore.addEventListener('click', searchPhoto);
let page = 1;
let searchText = '';
let fotoTotal = 0;
let fotoTotalLength = 0;
const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
  });
const optionsSearch = searchParams.toString()
function getTextForSearch(event) {
  event.preventDefault();
  searchText = event.currentTarget.elements.searchQuery.value.trim();
  if (searchText === '') {
    anserWarning();
    return;
  }
  clearPhotoContainerAndInputValue();
  page = 1;
  fotoTotalLength = 0;
  searchPhoto();
}

function searchPhoto() {

  fetchSearch(searchText);
}

async function fetchSearch(searchText) {

    try {
         const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchText}&per_page=40&page=${page}&${optionsSearch}`);
        return processingPhoto(response)
      } catch (error) {
        console.log(error)
        anserError()
      }
}

function processingPhoto(value) {
  if (value.data.hits.length === 0) {
    anserError();
    return;
  }
  fotoTotal = value.data.totalHits;
  renderPhoto(value.data);
}

function renderPhoto(photoData) {
  

  anserMessage(photoData.hits.length);
  page += 1;
  photoData.hits.map(
    ({ comments, downloads, largeImageURL, likes, views, webformatURL }) => {
      const murcup = `<div class="photo-card"><a href="${largeImageURL}"><img class="photo-img" src="${webformatURL}" alt="" loading="lazy" width="320" height="220" /></a><div class="info"><div class="info-box-one"><p class="info-item"><b>Likes: ${likes}</b></p><p class="info-item"><b>Views: ${views}</b></p></div><div class="info-box-two"><p class="info-item"><b>Comments: ${comments}</b></p><p class="info-item"><b>Downloads: ${downloads}</b></p></div></div></div>`;

      refs.gallery.insertAdjacentHTML('beforeend', murcup);
      lightbox.refresh();
    }
  );
  activeBtnLoadMore();
}

function activeBtnLoadMore() {
  refs.btnLoadMore.classList.remove('is-hidden');
}
function dissActiveBtnLoadMore() {

  refs.btnLoadMore.classList.add('is-hidden');
}

function anserMessage(lengthCurrentPhoto) {
  fotoTotalLength += lengthCurrentPhoto;

  if (fotoTotal > fotoTotalLength) {
    Notify.success(
      `Hooray! We found ${
        fotoTotal - fotoTotalLength + lengthCurrentPhoto
      } images.`,
      optionMessage
    );
  } else if (fotoTotalLength > fotoTotal) {
    Notify.info(
      "We're sorry, but you've reached the end of search results.",
      optionMessage
    );
    dissActiveBtnLoadMore();
  } else if (fotoTotal === fotoTotalLength) {
    console.log("цц")
    Notify.success(
        `Hooray! We found ${lengthCurrentPhoto} images.`,
        optionMessage
      );
    dissActiveBtnLoadMore();
  }
}

function anserError() {
    dissActiveBtnLoadMore()
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    optionMessage
  );
  
}
function anserWarning() {
  Notify.info('Please enter a value to search for', optionMessage);
}

function clearPhotoContainerAndInputValue() {
  refs.gallery.innerHTML = '';
  refs.input.value = '';
}

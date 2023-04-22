import { doStuff } from './api-system';
import { anserError, anserWarning, cleanerfotoTotalLength} from './notification';
import { dissActiveBtnLoadMore } from './switch-button';
import { clearPhotoContainerAndInputValue } from './cleaner';
import { renderPhoto } from './renderihg-and-creating-gallery';
export {refs, fotoTotal, page, processingPhoto };

let page = 1;
let searchText = '';
let fotoTotal = 0;

const refs = {
  formSearch: document.querySelector('#search-form'),
  input: document.querySelector('[type="text"]'),
  btnSubmit: document.querySelector("[type='submit']"),
  btnLoadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};
refs.formSearch.addEventListener('submit', getTextForSearch);
refs.btnLoadMore.addEventListener('click', searchPhoto);

function getTextForSearch(event) {
  event.preventDefault();
  dissActiveBtnLoadMore();
  searchText = event.currentTarget.elements.searchQuery.value.trim();
  if (searchText === '') {
    anserWarning();
    return;
  }
  clearPhotoContainerAndInputValue();
  page = 1;
  cleanerfotoTotalLength();
  searchPhoto();
}

function searchPhoto() {
  doStuff(searchText);
}

const processingPhoto = value => {
  if (value.data.hits.length === 0) {
    anserError();
    return;
  }
  fotoTotal = value.data.totalHits;
  renderPhoto(value.data);
  page += 1;
};

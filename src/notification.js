import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { activeBtnLoadMore, dissActiveBtnLoadMore } from './switch-button';
import { fotoTotal } from './index';
export {anserMessages, anserError, anserWarning, cleanerfotoTotalLength}
let fotoTotalLength = 0;
const optionMessage = {
  position: 'right-top',
  timeout: 2250,
  fontSize: '20px',
  borderRadius: '15px',
};
const anserMessages = lengthCurrentPhoto => {
  fotoTotalLength += lengthCurrentPhoto;
  activeBtnLoadMore();

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
    Notify.success(
      `Hooray! We found ${lengthCurrentPhoto} images.`,
      optionMessage
    );
    dissActiveBtnLoadMore();
  }
};

const anserError = () => {
  dissActiveBtnLoadMore();
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    optionMessage
  );
};
const anserWarning = () => {
  Notify.info('Please enter a value to search for', optionMessage);
};

const cleanerfotoTotalLength = () => {
  fotoTotalLength = 0;
};

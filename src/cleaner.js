import { refs } from './index';
export { clearPhotoContainerAndInputValue };

const clearPhotoContainerAndInputValue = () => {
  refs.gallery.innerHTML = '';
  refs.input.value = '';
};

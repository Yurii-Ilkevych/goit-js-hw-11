export { activeBtnLoadMore, dissActiveBtnLoadMore };
import { refs } from "./index";

const activeBtnLoadMore = () => {
  refs.btnLoadMore.classList.remove('is-hidden');
};
const dissActiveBtnLoadMore = () => {
  refs.btnLoadMore.classList.add('is-hidden');
};

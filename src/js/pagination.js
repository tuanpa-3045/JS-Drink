import { $, $$ } from "./constant.js";

const calcTotalPage = ({ _totalProducts, _limit }) => {
  return Math.ceil(_totalProducts / _limit);
};

export const renderPagination = (pagination) => {
  let { _page, _totalProducts, _limit } = pagination;
  let productsPagination = $("#js-products-pagination");
  let pages = calcTotalPage({ _page, _totalProducts, _limit });

  let html = "";

  for (let i = 1; i <= pages; i++) {
    html +=
      i === _page
        ? `<li class="page-item active"><button class="page-link pagination" data-pagination=${i}>${i}</button></li>`
        : `<li class="page-item"><button class="page-link pagination" data-pagination=${i}>${i}</button></li>`;
  }

  productsPagination.innerHTML = html;
};

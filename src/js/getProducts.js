import { $, $$ } from "./constant.js";
import { setLocal, getLocal, formatNumber } from "./function.js";
import { showSuccessToast } from "./toast.js";
import { getQuantity } from "./getQuantity.js";
import { getProducts } from "./api.js";
import { renderCategory } from "./getCategory.js";
import { renderPagination } from "./pagination.js";

let params = { _page: 1, _limit: 6 };

const renderProducts = (data) => {
  let html = data.map((item, index) => {
    return `
            <div class="col-12 col-sm-6 col-lg-4 mb-3">
              <div class="product__image">
                <div class="tag-${item.tag}">
                  <img src=${item.urlImage} alt="product image" />
                  <div class="product__info">
                    <button class="icon"><i class="fa-solid fa-heart"></i>Yêu thích</button>
                    <button class="icon"><i class="fas fa-signal mr-1"></i>So sánh</button>
                    <button class="icon"><i class="fa-solid fa-down-left-and-up-right-to-center"></i></button>
                  </div>
                </div>
                <div class="product__content text-center">
                  <h3 class="product__title">${item.title}</h3>
                  <p class="main-price my-3">
                  ${formatNumber(item.cost * 0.9)}
                    <del class="product__cost">${formatNumber(item.cost)}</del>
                  </p>
                  <button class="button js-add-cart" data-id=${item.id}>
                    add to cart
                  </button>
                  <p class="product__description"></p>
                </div>
              </div>
            </div>
        `;
  });
  return { html };
};

const filterItem = (item) => {
  let value = item.target.getAttribute("data-category");
  loadProducts({ ...params, category_like: value });
};

const addToCart = ({ id, data, payload }) => {
  showSuccessToast({ mes: "Thêm vào giỏ hàng thành công" });
  const result = data.find((element) => element.id === +id);

  const product = payload.filter(
    (element) => element.id === +id && (element.amount += 1)
  );

  if (product.length === 0) {
    payload.push({
      ...result,
      amount: 1,
    });
  }
  setLocal({ key: "cart", value: payload });
  getQuantity();
};

const handlePagination = (item) => {
  let page = item.target.getAttribute("data-pagination");
  loadProducts({ ...params, _page: page });
};

export async function loadProducts(params) {
  try {
    const { products, pagination } = await getProducts(params);

    renderPagination(pagination);

    const payload = getLocal("cart");

    if (products) {
      const { html } = renderProducts(products);

      $("#js-product").innerHTML = html.join(" ");

      $$(".js-add-cart").forEach((item) =>
        item.addEventListener("click", () =>
          addToCart({ id: item.dataset.id, data: products, payload })
        )
      );
    }
    $$(".pagination").forEach((item) => {
      item.addEventListener("click", handlePagination);
    });

    $$(".filter").forEach((item) => item.addEventListener("click", filterItem));
  } catch (e) {
    console.log(e);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  renderCategory();
  getQuantity();
  loadProducts(params);
});

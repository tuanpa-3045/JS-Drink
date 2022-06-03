import { $, $$ } from "./constant.js";
import { setLocal, getLocal, formatNumber } from "./function.js";

const handleDecrease = ({ id, data }) => {
  const result = data.find((element) => element.id === +id);

  if (result.amount > 1) {
    result.amount -= 1;
  }

  setLocal({ key: "cart", value: data });
  getToCart();
};

const handleIncrease = ({ id, data }) => {
  const result = data.find((element) => element.id === +id);
  result.amount += 1;

  setLocal({ key: "cart", value: data });
  getToCart();
};

const handleDelete = ({ id, data }) => {
  const modalDelete = $("#js-modal-delete");

  modalDelete.setAttribute("data-id", id);
  modalDelete.onclick = () => {
    const result = data.find((element) => element.id === +id);
    data.splice(data.indexOf(result), 1);

    setLocal({ key: "cart", value: data });
    getToCart();
  };
};

const handleRenderCart = ({ data }) => {
  let html;
  if (data.length > 0) {
    html = data.map((item, index) => {
      return `
        <tr class="cart__row">
          <td scope="row"><img src=${item.urlImage} alt="cart image"/></td>
          <td>${item.title}</td>
          <td>${formatNumber(item.cost)}</td>
          <td>
            <button data-id=${item.id} class="decrease"> -
            </button>
            ${item.amount}
            <button data-id=${item.id} class="increase"> +
            </button>
          </td>
          <td>${formatNumber(item.cost * item.amount)}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger deleteProduct"
              data-id=${item.id}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      `;
    });
  } else {
    html = `<tr><td colspan="100%" style="text-align: center" >Không có sản phẩm nào trong giỏ hàng. <a href="/list-category-product.html"> Đi đến trang mua hàng </a> </td></tr>`;
  }
  return { html };
};

async function getToCart() {
  try {
    const localCart = getLocal("cart");
    const { html } = handleRenderCart({ data: localCart });
    const button = [
      {
        decrease: "handleDecrease",
      },
      {
        increase: "handleIncrease",
      },
      {
        deleteProduct: "handleDelete",
      },
    ];

    $("#js-cart-table").innerHTML =
      localCart.length > 0 ? html.join(" ") : html;

    button.forEach((item) => {
      $$(`.${Object.keys(item)}`).forEach((element) => {
        element.addEventListener("click", () => {
          eval(
            `${Object.values(item)}({
              id: element.dataset.id,
              data: localCart
            })`
          );
        });
      });
    });

    if (localCart.length > 0) {
      $("#js-checkout").onclick = () => {
        window.location.href = "./address.html";
      };
    }
  } catch (e) {
    console.log(e);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getToCart();
});

import { $ } from "./constant.js";
import { setLocal, getLocal } from "./function.js";
import { showErrorToast } from "./toast.js";
const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regexPhoneNumber = new RegExp(/^[0-9]{10,11}$/);

function checkFormValid() {
  let isValid = true;
  const valuePhone = $("#phone").value;
  const valueEmail = $("#email").value;

  if (!valuePhone || !valueEmail) {
    showErrorToast({ mes: "Vui lòng nhập Email và Số Điện Thoại" });
    return false;
  }

  if (regexPhoneNumber.test(valuePhone)) {
    $("#js-phone-error").innerHTML = ``;
  } else {
    $("#js-phone-error").innerHTML = `
        <p class="text-danger">Số điện thoại không hợp lệ</p>
      `;
    isValid = false;
  }

  if (regexEmail.test(valueEmail)) {
    $("#js-email-error").innerHTML = ``;
  } else {
    $("#js-email-error").innerHTML = `
        <p class="text-danger">Email không hợp lệ</p>
      `;
    isValid = false;
  }
  return isValid;
}

function loadFormValue() {
  const dataUser = getLocal("address");

  Object.entries(dataUser).forEach((data) => {
    const [key, value] = data;
    $(`#${key}`).value = value || "";
  });
}

function saveAddressToLocal() {
  $("#checkout").addEventListener("click", function (e) {
    if (checkFormValid()) {
      setLocal({
        key: "address",
        value: {
          name: $("#name").value,
          email: $("#email").value,
          phone: $("#phone").value,
          address: $("#address").value,
        },
      });
      window.location.href = "./order.html";
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadFormValue();
  saveAddressToLocal();
});

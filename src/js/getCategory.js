import { $, $$ } from "./constant.js";
import { getCategory } from "./api.js";

export async function renderCategory(params) {
  try {
    const data = await getCategory();

    const filterItem = () => {
      console.log("a");
    };

    $$(".filter").forEach((item) =>
      item.addEventListener("click", console.log("a"))
    );

    let html = data.map((item, index) => {
      return `<li class="sidebar__item filter" data-category="${item}" >${item}</li>`;
    });

    $("#js-list-category").innerHTML = html.join(" ");
  } catch (e) {
    console.log(e);
  }
}

import { $ } from "./constant.js";
import { getLocal } from "./function.js";

export function getQuantity() {
  try {
    let initialValue = 0;
    const localCart = getLocal("cart");

    const sumWithInitial = localCart.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      initialValue
    );

    $("#amount").innerHTML = sumWithInitial;
  } catch (e) {
    console.log(e);
  }
}

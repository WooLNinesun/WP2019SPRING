import BigNum from "big.js";

export default function operate(LHS, RHS, operation) {
  const one = BigNum(LHS || "0");
  const two = BigNum(RHS || "0");

  if (operation === "+") {
    return one.plus(two).toString();
  }
  if (operation === "-") {
    return one.minus(two).toString();
  }
  if (operation === "x") {
    return one.times(two).toString();
  }
  if (operation === "÷") {
    if (two === "0") {
      alert('Divide by 0 error');
      return "0";
    } else {
      return one.div(two).toString();
    }
  }
  throw Error(`Unknown operation '${operation}'`);
}

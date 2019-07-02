import BigNum from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Calculator prevdata object contains:
 *   total:String      the running total
 *   nextValue:String       the next number to be operated on with the total
 *   prevValue:String       the prev number to be operated on with the total
 *   nextOperation:String  +, -, etc.
 *   prevOperation:String  +, -, etc.
 */
export default function calculate(prevdata, buttonValue) {
  // function opteration
  if (buttonValue === "AC") {
    return {
      total: null,
      nextValue: null,
      prevValue: null,
      nextOperation: null,
      prevOperation: null,
    };
  }
  if (buttonValue === "+/-") {
    if (prevdata.nextValue) {
      return { nextValue: (-1 * parseFloat(prevdata.nextValue)).toString() };
    }
    if (prevdata.total) {
      return { total: (-1 * parseFloat(prevdata.total)).toString() };
    }
    return {};
  }
  if (buttonValue === "%") {
    if (prevdata.nextOperation && prevdata.nextValue) {
      const result = operate(prevdata.total, prevdata.nextValue, prevdata.nextOperation);
      return {
        total: BigNum(result).div(BigNum("100")).toString(),
        nextValue: null,
        nextOperation: null,
      };
    }
    if (prevdata.nextValue) {
      return {
        nextValue: BigNum(prevdata.nextValue).div(BigNum("100")).toString(),
      };
    }
    if (prevdata.total) {
      return {
        total: BigNum(prevdata.total).div(BigNum("100")).toString(),
      };
    }
    return {};
  }

  // number 
  if (isNumber(buttonValue)) {
    if (buttonValue === "0" && prevdata.nextValue === "0") { return {}; }

    let total = prevdata.total, value = buttonValue;

    // If there is no operation, update next and clear the value
    if (!prevdata.nextOperation) { total = null; }

    if (prevdata.nextValue && prevdata.nextValue !== "0") {
      value = prevdata.nextValue + buttonValue;
    }
    return { nextValue: value, total: total };
  }

  if (buttonValue === ".") {
    let value = "0";
    if (prevdata.nextValue) { value = prevdata.nextValue; }

    // ignore a . if the next number already has one
    if (value.includes(".")) { return {}; }
    return { nextValue: value + "." };
  }

  if (buttonValue === "=") {
    if (prevdata.nextValue && prevdata.nextOperation) {
      return {
        total: operate(prevdata.total, prevdata.nextValue, prevdata.nextOperation),
        nextValue: null,
        prevValue: prevdata.nextValue,
        nextOperation: null,
        prevOperation: prevdata.nextOperation,
      };
    }
    if (prevdata.prevValue && prevdata.prevOperation) {
      return {
        total: operate(prevdata.nextValue || prevdata.total, prevdata.prevValue, prevdata.prevOperation),
        nextValue: null,
        nextOperation: null,
      };
    }
    return {};
  }

  // User pressed an operation button and there is an existing operation
  if (prevdata.nextOperation) {
    return {
      total: operate(prevdata.total, prevdata.nextValue, prevdata.nextOperation),
      nextValue: null,
      nextOperation: buttonValue,
    };
  }

  // The user hasn't typed a number yet, just save the operation
  if (!prevdata.nextValue) {
    return { nextOperation: buttonValue };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: prevdata.nextValue,
    nextValue: null,
    nextOperation: buttonValue,
  };
}

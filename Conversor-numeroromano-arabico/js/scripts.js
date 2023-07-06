const btnConvert = document.querySelector("#calc-btn");
const btnClear = document.querySelector("#clear-btn");


function handleInput(e) {
  var selectionStr = e.target.selectionStart;
  var selectionEnd = e.target.selectionEnd;
  e.target.value = e.target.value.toUpperCase();
  e.target.selectionStart = selectionStr;
  e.target.selectionEnd = selectionEnd;
}

function convertNumber() {
  var numero = document.getElementById("number").value.trim();

  var resultado = "";


  if (/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(number)) {
    resultado = romanToArabic(numero.toUpperCase()).toString();
  } else {
    resultado = arabicToRoman(parseInt(numero));
  }

  document.querySelector(".result").textContent = resultado;
}

function romanToArabic(roman) {

  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentSymbol = roman[i];
    const currentValue = romanValues[currentSymbol];


    if (i < roman.length - 1) {
      const nextSymbol = roman[i + 1];
      const nextValue = romanValues[nextSymbol];
      if (currentValue < nextValue) {
        result -= currentValue;
        continue;
      }
    }

    result += currentValue;
  }

  return result;
}

function arabicToRoman(arabic) {
  const romanValues = [
    (M = { value: 1000, symbol: "M" }),
    (CM = { value: 900, symbol: "CM" }),
    (D = { value: 500, symbol: "D" }),
    (CD = { value: 400, symbol: "CD" }),
    (C = { value: 100, symbol: "C" }),
    (XC = { value: 90, symbol: "XC" }),
    (L = { value: 50, symbol: "L" }),
    (XL = { value: 40, symbol: "XL" }),
    (X = { value: 10, symbol: "X" }),
    (IX = { value: 9, symbol: "IX" }),
    (V = { value: 5, symbol: "V" }),
    (IV = { value: 4, symbol: "IV" }),
    (I = { value: 1, symbol: "I" }),
  ];

  let roman = "";

  for (let i = 0; i < romanValues.length; i++) {
    const { value, symbol } = romanValues[i];

    while (arabic >= value) {
      roman += symbol;

      arabic -= value;
    }
  }

  return roman;
}

btnConvert.addEventListener("click", function (event) {
  event.preventDefault();
  var numero = document.getElementById("number").value.trim();
  if (!/^(?:[1-9]\d{0,3}|[IVXLCDM]{1,15})$/i.test(numero)) {
    document.querySelector(".result").innerHTML =
      "Número inválido. Por favor, insira um número inteiro positivo entre 1 e 3999.";
    return;
  }

  var resultadoRomano = "";
  var resultadoArabico = "";

  if (romanToArabic(numero)) {
    resultadoArabico = romanToArabic(numero);
    resultadoRomano = numero;
  } else {
    resultadoRomano = arabicToRoman(numero);
    resultadoArabico = numero;
  }

  document.querySelector(".result").innerHTML =
    "Número Romano: " +
    resultadoRomano +
    "<br> Número Arábico: " +
    resultadoArabico;
});

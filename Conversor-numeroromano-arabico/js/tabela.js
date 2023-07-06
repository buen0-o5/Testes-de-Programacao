// Cria uma tabela HTML dinamicamente
const numeros = [
  { romano: "I", arabe: 1, },
  { romano: "II", arabe: 2,},
  { romano: "III", arabe: 3, },
  { romano: "IV", arabe: 4, },
  { romano: "V", arabe: 5, },
  { romano: "VI", arabe: 6, },
  { romano: "VII", arabe: 7, },
  { romano: "VIII", arabe: 8, },
  { romano: "IX", arabe: 9, },
  { romano: "X", arabe: 10, },
  { romano: "XI", arabe: 11, },
  { romano: "XII", arabe: 12, },
  { romano: "XIII", arabe: 13, },
  { romano: "XIV", arabe: 14, },
  { romano: "XV", arabe: 15, },
  { romano: "XVI", arabe: 16, },
  { romano: "XVII", arabe: 17, },
  { romano: "XVIII", arabe: 18, },
  { romano: "XIX", arabe: 19, },
  { romano: "XX", arabe: 20, },
  { romano: "XXI", arabe: 21, },
  { romano: "XXII", arabe: 22, },
  { romano: "XXIII", arabe: 23, },
  { romano: "XXIV", arabe: 24, },
  { romano: "XXV", arabe: 25, },
  { romano: "XXX", arabe: 30, },
  { romano: "XL", arabe: 40, },
  { romano: "L", arabe: 50, },
  { romano: "LX", arabe: 60, },
  { romano: "LXX", arabe: 70, },
  { romano: "LXXX", arabe: 80, },
  { romano: "XC", arabe: 90, },
  { romano: "C", arabe: 100, },
  { romano: "CD", arabe: 400,},
  { romano: "D", arabe: 500,},
  { romano: "DC", arabe: 600, },
  { romano: "DCC", arabe: 700, },
  { romano: "DCCC", arabe: 800, },
  { romano: "CM", arabe: 900, },
  { romano: "M", arabe: 1000, },
];

//selecionando elementos

const cvTable = document.querySelector("#cv-table"); //imc-table
const backBtn = document.querySelector("#back-btn");

//Funções

function createTable(numeros) {
  numeros.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-numero");

    const arabe = document.createElement("p");
    arabe.innerHTML = item.arabe;

    const romano = document.createElement("p");
    romano.innerHTML = item.romano;

    div.appendChild(arabe);
    div.appendChild(romano);

    cvTable.appendChild(div);
  });
}

createTable(numeros);

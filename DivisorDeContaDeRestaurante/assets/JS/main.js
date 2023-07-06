const inputCliente = document.querySelector('#cliente');
const inputProduto = document.querySelector('#produto');
const inputValor = document.querySelector('#valor');
const btnCliente = document.querySelector('.btn-Cliente');
const btnProduto = document.querySelector('.btn-Produto');
const btnCalcular = document.querySelector('#calcular');
const tarefasCliente = document.querySelector('.tarefas-cliente');
const tarefasProduto = document.querySelector('.tarefas-produto');
const resultadoList = document.querySelector('#resultado-list');
let listaClientes = [];
let listaProdutos = [];
let listaValores = [];
const gastosClientes = {};

btnCliente.addEventListener('click', adicionarCliente);
btnProduto.addEventListener('click', adicionarProduto);
btnCalcular.addEventListener('click', calcularDivisao);

function adicionarCliente() {
  const nomeCliente = inputCliente.value.trim();
  if (nomeCliente !== '') {
    listaClientes.push(nomeCliente);
    gastosClientes[nomeCliente] = 0;
    const li = document.createElement('li');
    li.textContent = nomeCliente;
    tarefasCliente.appendChild(li);
    inputCliente.value = '';
  }
}

function adicionarProduto() {
  const nomeProduto = inputProduto.value.trim();
  const valorProduto = parseFloat(inputValor.value.trim());
  
  if (nomeProduto !== '' && !isNaN(valorProduto) && valorProduto > 0) {
    listaProdutos.push(nomeProduto);
    listaValores.push(valorProduto);
    const li = document.createElement('li');
    li.textContent = `${nomeProduto} - R$ ${valorProduto.toFixed(2)}`;
    tarefasProduto.appendChild(li);
    inputProduto.value = '';
    inputValor.value = '';
  }
}

function calcularDivisao() {
  const numClientes = listaClientes.length;
  const numProdutos = listaProdutos.length;
  
  if (numClientes === 0 || numProdutos === 0) {
    alert('Adicione pelo menos um cliente e um produto antes de calcular a divisão.');
    return;
  }
  
  const valorTotal = listaValores.reduce((acc, valor) => acc + valor, 0);
  const taxaServico = parseFloat(document.querySelector('#taxa').value.trim());
  
  let valorComTaxa;
  if (!isNaN(taxaServico) && taxaServico >= 0) {
    valorComTaxa = valorTotal * (1 + taxaServico / 100);
  }else if(isNaN(taxaServico) && taxaServico >= 0){
    valorComTaxa = valorTotal;
  }
  
  for (let i = 0; i < numClientes; i++) {
    const cliente = listaClientes[i];
    const valorGasto = listaValores[i];
    gastosClientes[cliente] += valorGasto;
  }
  
  resultadoList.innerHTML = '';
  
  for (let cliente of listaClientes) {
    const valorGasto = gastosClientes[cliente];
    const valorFinal = valorComTaxa !== undefined ? (valorGasto * (1 + taxaServico / 100)) / numClientes : valorGasto / numClientes;
    const li = document.createElement('li');
    li.textContent = `${cliente}: R$ ${valorFinal.toFixed(2)}`;
    resultadoList.appendChild(li);
  }
  listaProdutos.splice(0, listaProdutos.length);
  listaValores.splice(0, listaValores.length);
  listaClientes.splice(0, listaClientes.length);

}

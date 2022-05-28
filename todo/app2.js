// 3. console do valor da caixa de texto
// ao clicar no span do lixo, selecionar o li correspondente para o remover. para isto, o eventListener tem que estar à escuta do ul, para apanhar todos os elementos

const adicionarTodo = document.querySelector('.add');
const todos = document.querySelector('ul');
const search = document.querySelector('.search input'); // apanha o input dentro da class search
var todoList = [];

function addTodo(todo) {
  const newTodo = `<li class="list-group-item d-flex justify-content-between align-items-center">
  <span>${todo}</span>
  <i class="far fa-trash-alt delete"></i>
</li>`; // pega em todo o valor de li e coloca o valor adicionado em add (na variável)
todos.innerHTML = todos.innerHTML + newTodo; // o conteúdo dentro do ul passa a ser o ul + o novo li criado
}

document.addEventListener('submit', e => {
    e.preventDefault(); // para não fazer refresh ao submeter
    if (e.target.add.value.trim().length > 0) { // caso o valor adicionado sem espaços no início e no fim tenha um comprimento de caracteres maior que 0, vai adicionar o novo li
      addTodo(e.target.add.value.trim());
      todoList.push(e.target.add.value.trim());
      localStorage.setItem('todos',JSON.stringify(todoList));
    }
    adicionarTodo.reset();
});

todos.addEventListener('click', e => {
  // console.log("target",e.target);
  // console.log("tagName",e.target.tagName);
  if (e.target.tagName == 'I') { // caso o tagname do elemento clicado seja i
    todoList = todoList.filter( todo => todo != e.target.parentElement.innerText.trim()); // filtra e retorna todos os elementos que sejam diferentes daquele apagado, garantindo que o valor analisado não tem espaços extra ou caracteres extra
    // console.log(e.target.parentElement.innerText);
    // console.log('antes',todoList);
    localStorage.setItem('todos',JSON.stringify(todoList));
    // console.log('após',todoList);
    e.target.parentElement.remove(); // vai para o parent element (neste caso, li) e remove-o
  }
});

search.addEventListener('keyup',e => { // apanha e adiciona o valor cada vez que escreve uma letra
  console.log(search.value);
  const lis = document.querySelectorAll('li');
  lis.forEach( li => {
    if (li.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      li.classList.remove('filtered');
      // li.style.display = 'block';
    } else {
      li.classList.add('filtered');
      // li.style.setProperty("display","none","important");
    }
  });
});

window.addEventListener( "load", e => { // quando a página carrega
  // console.log(JSON.parse(localStorage.getItem('todos')));
  todoList = [...JSON.parse(localStorage.getItem('todos'))];
  // console.log(todoList);

  // carregar o UL com os LIS
  todoList.forEach( todo => {
    addTodo(todo);
  });
});
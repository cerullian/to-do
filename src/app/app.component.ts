import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos = ['Tarefa 1','Tarefa 2','Tarefa 3']
  todo = "";
  search = "";

  addTodo() {
    // ao clicar no botão, ele puxa o valor que ficou adicionado à variável (através do input com o ngModel) todo e depois limpa a caixa
    this.todos.push(this.todo);
    this.todo = "";
  }

  delTodo(todo:string) {
    // a constante index assume o index do todo, para passar no primeiro parâmetro do splice
    const index = this.todos.indexOf(todo);
    this.todos.splice(index,1);
  }

  onFilter(event: Event) {
    this.search = (<HTMLInputElement>event.target).value;
    // cada vez que a caixa de texto muda, ele atualiza
  }

  onSearch(todo: string) {
    // se algo foi escrito na caixa de texto
    if (this.search != "") {
      // para cada valor da array de todos, se ele inclui o que está na caixa de texto (em lower case)
      if (todo.toLowerCase().includes(this.search.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}

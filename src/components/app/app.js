import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddFrom from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  // Экспериментальный синтаксис полей классов, state объявлен не внутри родительского конструктора

  state = {
    // Создаем массив первоначальных данных
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all' // active, all, done
  };

  // Свойство, которое не вошло в стандарт, "поля классов" ("class fields") 
  //- позволяет писать метод класса внутри тела класса без вызова родительского конструктора и метода super

  createTodoItem (label) {
    return {
      label,
      important: false, 
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = (id) => {

    // Setstate работает асинхронно, 
    // поэтому когда нам надо изменить state в зависимости от его старого значения, 
    // надо принять на вход метода Setstate - старый state в виде аргумента функции (важно, что мы не передаем просто объект)
    // { todoData } - деструктуризация объекта state, запись в переменную свойства state: todoData

    this.setState(({ todoData }) => {
      // находим индекс того элемента, который надо удалить 
      const idx = todoData.findIndex((el) => el.id === id);
      // чтобы не изменять существующий массив, используем метод slice, где находим все эл-ты до/после удаляемого 
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      // используем оператор spread, чтобы создать новый массив на основе двух других
      const newArray = [ ...before, ...after];
      // можно сократить запись 
      // const newArray = [ ...todoData.slice(0, idx), ...todoData.slice(idx + 1)];


      return {
        todoData: newArray
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    // { todoData } - деструктуризация объекта state
    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty (arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    // [propName] перезапишет свойство старого объекта
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);

    // возвращаем новый массив, вместо удаленного элемента - добавляется новый с обновленным свойством
    return [ ...before, newItem, ...after];
  };

  onToggleDone = (id) => {
    // { todoData } - деструктуризация объекта state
    this.setState(({todoData}) => {
     return {
      todoData: this.toggleProperty(todoData, id, 'done')
     };
    });
  };

  onToggleImportant = (id) => {
    // { todoData } - деструктуризация объекта state
    this.setState(({todoData}) => {
     return {
      todoData: this.toggleProperty(todoData, id, 'important')
     };
    });
  };

  onSearchChange = (term) => {
    // { term } - деструктуризация объекта state
    this.setState( {term} );
  };

  onFilterChange = (filter) => {
    // { filter } - деструктуризация объекта state
    this.setState( {filter} );
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term) > -1;
    });
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done': 
        return items.filter((item) => item.done);
      default: 
        return items;
    }
  }

  render () {

    // Деструктуризация объекта state

    const { todoData, term, filter } = this.state;

    // Метод filter создает новый массив, поэтому мы не изменяем старый

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter currentFilter={filter} onFilterChange={this.onFilterChange}/>
        </div>

        <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone}/>

        <ItemAddFrom onItemAdded={ this.addItem }/>
      </div>
    );
  }
};


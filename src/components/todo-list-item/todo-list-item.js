import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {

  constructor() {
    super();
  }

  render () {

    // Деструктуризация объекта props

    const { label, onDeleted, onToggleImportant, onToggleDone, done, important} = this.props; 

    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }

    // onDeleted, onToggleImportant, onToggleDone - кастомные события, которые нам передаются от "todo-list" через props, 
    // который в свою очередь получает их от компонента "app" 
    // через события данные поднимаются "вверх" по иерархии компонентов

    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone}>
          {label}
        </span>

        <button type="button"
                className="btn btn-outline-success btn-sm float-right">
          <i className="fa fa-exclamation" onClick={onToggleImportant}/>
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" onClick={onDeleted}/>
        </button>
      </span>
    );
  }
}
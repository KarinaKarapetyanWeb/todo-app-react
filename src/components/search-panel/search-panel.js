import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

  // Экспериментальный синтаксис полей классов, state объявлен не внутри родительского конструктора

  state = {
  	term: ''
  };

  // Свойство, которое не вошло в стандарт, "поля классов" ("class fields") 
  //- позволяет писать метод класса внутри тела класса без вызова родительского конструктора и метода super

  onSearchChange = (e) => {
  	const term = e.target.value.toLowerCase();
  	this.setState({ term });
  	this.props.onSearchChange(term);
  };

  render() {
  	return (
  		<input type="text" 
  			   className="form-control search-input" 
  			   placeholder="type to search" 
  			   value={this.state.term}
  			   onChange={this.onSearchChange}/>
    );
  }
}
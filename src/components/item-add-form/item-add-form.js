import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
	// Экспериментальный синтаксис полей классов, state объявлен не внутри родительского конструктора

	state = {
		label: ''
	};

	// Свойство, которое не вошло в стандарт, "поля классов" ("class fields") 
    //- позволяет писать метод класса внутри тела класса без вызова родительского конструктора и метода super

	onLabelChange = (evt) => {
		this.setState({
		  label: evt.target.value 
		});
	};

	onSubmit = (evt) => {
		evt.preventDefault();
		if (!this.state.label) {
		  alert('Введите значение в поле');
		} else {
			this.props.onItemAdded(this.state.label);
			this.setState({
			  label: ''
			});
		}
	};
	// Инпут контролируемый элемент, поскольку value получает из state
	// State - единственный источник истины

	render() {
		return (
			<form className="item-add-form d-flex" onSubmit={this.onSubmit}>
				<input type="text" className="form-control" onChange={this.onLabelChange} value={this.state.label} placeholder="What needs to be done" />
				<button className="btn btn-outline-secondary">Add&nbsp;Item</button>
			</form>
		)
	}
}

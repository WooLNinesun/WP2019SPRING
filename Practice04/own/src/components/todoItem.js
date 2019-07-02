import React, { Component } from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.item = this.props.item
    }

    render() {
        return (
            <li
                className={`todo-app__item ${this.item.isComplete ? "completed" : ""}`}
                data-item-id={this.item.id}
            >
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={this.item.id} />
                    <label htmlFor={this.item.id}></label>
                </div>
                <h1 className="todo-app__item-detail">{this.item.content}</h1>
                <img src="./img/x.png" alt="x" className="todo-app__item-x" />
            </li>
        );
    }
}

export default TodoItem;

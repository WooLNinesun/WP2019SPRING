import React, { Component } from 'react';
import TodoItem from './components/todoItem'
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todoItems: []
        }
    }

    handleTodoItemInput = (event) => {
        if (event.key === 'Enter' && event.target.value.trim() !== "") {
            this.setState({
                todoItems: [...this.state.todoItems, {
                    id: Date.now(),
                    content: event.target.value,
                    isComplete: false
                }]
            });
            event.target.value = "";
        }
    }

    delegateTodoItemClick = (event) => {
        if (event.target.tagName.toLowerCase() === "label") {
            let item_id = event.target.getAttribute("for");
            this.setState({
                todoItems: this.state.todoItems.map(
                    item => {
                        if (item.id.toString() === item_id) {
                            item.isComplete = !item.isComplete;
                        }
                        return item;
                    }
                )
            });
        } else if (event.target.className === "todo-app__item-x") {
            let item_id = event.target.parentElement.getAttribute("data-item-id");
            this.setState({
                todoItems: this.state.todoItems.filter(
                    item => item.id.toString() !== item_id
                )
            });

        };
    }

    render() {
        return (
            <div id="todo-app" className="todo-app__root">
                <header className="todo-app__header">
                    <h1 className="todo-app__title">todos</h1>
                </header>
                <section className="todo-app__main">
                    <input type="text"
                        id="todo-input" className="todo-app__input"
                        placeholder="What needs to be done?"
                        onKeyPress={this.handleTodoItemInput}
                    />
                    <ul id="todo-list" className="todo-app__list"
                        onClick={this.delegateTodoItemClick}
                    >
                        {this.state.todoItems.map(item => (
                            <TodoItem key={item.id} item={item} />
                        ))}
                    </ul>
                </section>
            </div>
        );
    }
}

export default App;

'use strict';

var ENTERKEY = 13;

class TodoListApp {
    /**
     * ImageViewer constructor function
     *
     * @param {Object} options - See README
     * @param {Object} options.container - HTML Element to contain todo list
     * @constructor
     */
    constructor (options) {
        this.container = options.container || document.getElementById("todo-app");
        this.items     = {};
        this.element   = {};
        this.state     = {
            _view: "all",
        };

        this.__define_object();
        this.__init_html();
        this.__add_event_listener();
    }

    /**
     * define my object { items, state } to use
     *
     */
    __define_object() {
        $define(this.state).$property("view", {
            get: () => {
                return this.state._view;
            },
            set: value => {
                this.items.forEach( item => {
                    switch (value) {
                        case "all":
                            item.node.style.display = "flex";
                            break;
                        case "active":
                            item.node.style.display = (item.isComplete)? "none":"flex";
                            break;
                        case "completed":
                            item.node.style.display = (item.isComplete)? "flex":"none";
                            break;
                        default:
                            item.node.style.display = "none";
                    }
                });
                this.state._view = value;
            }
        });

        $define(this.items).$Method( "add", raw_item => {
            let item = this.__create_item(raw_item);
            this.items[item.id] = item;
            this.element.list.appendChild(item.node);
            this.__update_footer();
        });
        $define(this.items).$Method( "remove", id => {
            this.element.list.removeChild(this.items[id].node);
            delete this.items[id];
            this.__update_footer();
        });
        $define(this.items).$Method( "active", id => {
            let item = this.items[id];
            item.isComplete = false;
            item.node.style.display = (this.state.view === "completed")? "none":"flex";
            item.node.classList.remove("completed");
            this.__update_footer();
        });
        $define(this.items).$Method( "completed", id => {
            let item = this.items[id];
            item.isComplete = true;
            item.node.style.display = (this.state.view === "active")? "none":"flex";
            item.node.classList.add("completed");
            this.__update_footer();
        });

        /* let items object work like Array */
        $define(this.items).$Method( "forEach", func => {
            return Object.keys(this.items).forEach( key => {
                return func(this.items[key], key);
            })
        });
        $define(this.items).$Method( "filter", func => {
            return Object.keys(this.items).filter( key => {
                return func(this.items[key], key);
            })
        });
        $define(this.items).$Method( "some", func => {
            return Object.keys(this.items).some( key => {
                return func(this.items[key], key);
            })
        });
    }

    /**
     * init HTML structure and event listener
     *
     */
    __init_html() {
        // HTML structure
        this.container.classList.add("todo-app__root");
        this.container.innerHTML = `
            <header class="todo-app__header">
                <h1 class="todo-app__title">todos</h1>
            </header>
            <section class="todo-app__main">
                <input type="text"
                    id="todo-input" class="todo-app__input"
                    placeholder="What needs to be done?"
                >
                <ul id="todo-list" class="todo-app__list"></ul>
            </section>
            <footer id="todo-footer" class="todo-app__footer">
                <div class="todo-app__total">0 left</div>
                <ul class="todo-app__view-buttons">
                    <li><button id="todo-view-all" class="current">All</button></li>
                    <li><button id="todo-view-active" >Active</button></li>
                    <li><button id="todo-view-completed" >Completed</button></li>
                </ul>
                <div class="todo-app__clean disable">
                    <button>Clear completed</button>
                </div>
            </footer>
        `;

        this.element.list  = $Selector("#todo-list", this.container);
        this.element.total = $Selector(".todo-app__total", this.container);
        this.element.clean = $Selector(".todo-app__clean", this.container);
    }

    /**
     * add event listener
     *
     */
    __add_event_listener() {
        /* Add new item input event Llstener */
        $Selector("#todo-input", this.container).$on( "keyup", event => {
            if (event.keyCode === ENTERKEY && event.target.value.trim() !== "")  {
                this.items.add({
                    content: event.target.value.trim(),
                    isComplete: false
                });
                event.target.value = "";
            }
        });

        /* Event Delegation on list to li */
        this.element.list.$on( 'click', event => {
            if(event.target.tagName.toLowerCase() === "label") {
                let item = this.items[ event.target.getAttribute("for") ];
                ((item.isComplete)? this.items.active:this.items.completed)(item.id);
            } else if( event.target.className === "todo-app__item-x" ) {
                let item_node = event.target.parentElement;
                let item_id   = item_node.getAttribute("data-item-id");
                this.items.remove(item_id);
            }
        });

        this.element.list.$on( 'dblclick', event => {
            if( event.target.className === "todo-app__item-detail" ) {
                let item_node = event.target.parentElement;
                item_node.classList.add("edit");

                let edit = $Selector( ".todo-app__item-edit", item_node );
                edit.value = event.target.textContent;
            }
        });

        this.element.list.$on( 'keyup', event => {
            if( event.target.className === "todo-app__item-edit" ) {
                if ( event.keyCode === ENTERKEY ) {
                    let item_node = event.target.parentElement;
                    item_node.classList.remove("edit");

                    let item_id = item_node.getAttribute("data-item-id");
                    let content = event.target.value.trim();
                    if ( content === "" ) { this.items.remove(item_id); }

                    let detail = $Selector( ".todo-app__item-detail", item_node );
                    detail.textContent = content;
                }
            }
        });
        
        /* footer view buttons event Llstener */
        let view_buttons = $SelectorAll(".todo-app__view-buttons button",this.container);
        let changeto = (view_current) => {
            view_buttons.forEach( button => { button.classList.remove("current"); });
            view_current.classList.add("current");
            this.state.view = view_current.getAttribute("id").replace(/todo-view-/g, "");
        }
        view_buttons.forEach( button => {
            button.$on("click", e => { changeto(e.target); });
        });

        /* footer clear completed button event Llstener */
        this.element.clean.$on( "click", () => {
            this.items.forEach( (item, id) => {
                if ( item.isComplete ) { this.items.remove(id); }
            });
        });
    }

    /**
     * update footer ui
     *
     */
    __update_footer() {
        let uncompleted_ids = this.items.filter( item => { return !item.isComplete; });
        this.element.total.textContent = `${uncompleted_ids.length} left`;

        let hes_completed = this.items.some( item => { return item.isComplete; });
        if ( hes_completed ) {
            this.element.clean.classList.remove("disable");
        } else {
            this.element.clean.classList.add("disable");
        }
    }

    /**
     * Create item node
     *
     * @param {Object} item - item attributes
     * @param {String} item.content - item content
     * @param {Boolean} item.isComplete = if true, item completed
     *
     */
    __create_item ( raw_item ) {
        let item  = raw_item;
        item.id   = Date.now()
        item.node = document.createElement("li");
        item.node.setAttribute("data-item-id", item.id );
        item.node.innerHTML = `
            <div class="todo-app__checkbox">
                <input type="checkbox" id="${item.id}">
                <label for="${item.id}"></label>
            </div>
            <h1 class="todo-app__item-detail">${escapeHTML(item.content)}</h1>
            <input type="text" class="todo-app__item-edit">
            <img src="./img/x.png" class="todo-app__item-x">
        `;

        item.node.className = "todo-app__item";
        if ( raw_item.isComplete ) { item.node.classList.add( "completed" ); }

        return item;
    }
}

/* my helper function */
function $Selector(selector, scope) {
    let node = (scope || document).querySelector(selector);
    node.$on = function(type, callback, useCapture) {
        this.addEventListener(type, callback, !!useCapture);
    };
    return node;
};


function $SelectorAll(selector, scope) {
    let nodes = (scope || document).querySelectorAll(selector);
    nodes.forEach( node => {
        node.$on = function(type, callback, useCapture) {
            this.addEventListener(type, callback, !!useCapture);
        };
    });
    return nodes;
};

function $define(obj) {
    return {
        $Method(name, func) {
            Object.defineProperty( obj, name, {
                enumerable: false, configurable: false, writable: false, value: func
            });
        },
        $property(name, func) {
            let property = { enumerable: true, configurable: false }
            if ( func.get ) { property.get = func.get; }
            if ( func.set ) { property.set = func.set; }
            Object.defineProperty( obj, name, property);
        }
    }
};

function escapeHTML(s) { 
    return s.replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
}

/// <reference path="yui.d.ts" />
/// <reference path="my-yui-modules.d.ts" />

// O único objeto exportado deste módulo é a função
// logObjProps(name: string, myObject: object) que mostra
// na console a lista de atributos do objeto, seu tipo e valor
// (caso o atributo seja tipo primitivo : string, number, boolean)
// 
// Toda a implementação da Aplicação é adicionada ao NameSpace do YUI3
// via chamada do método YUI.add( ... ); e fica disponível para ser usado 
// via chamada do método YUI.use( ... );

module todomvc {
    "use strict";
    var TODO_MODULE_VERSION = '1.0.1'; // '@VERSION@';
    var TODO_LOCAL_STORAGE_KEY = 'all-todos-yui-ts';

    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function(str) {
            return this.indexOf(str) === 0;
        };
    }

    function transverse(name: string, myObject: any, func?: Function) {
        var type = typeof (myObject);
        var msg = '' + name + ' is ' + type;
        if (myObject instanceof Array) {
            msg += ' and one instance of Array '
            + 'class with length ' + myObject.length;
        }
        console.log(msg);
        for (var prop in myObject) {
            // to filter out prototype properties
            if (myObject.hasOwnProperty(prop)) {
                // func('\n' + prop + ': ' + myObject[prop]);
                // Ignoro aqueles que coemçam com Underscore
                if (prop.startsWith('_')) {
                    continue;
                }
                var txt = myObject[prop];
                type = typeof (myObject[prop]);
                if (type == 'string' || type == 'number' || type == 'boolean') {
                    txt = ' is ' + type + ' : ' + myObject[prop];
                } else {
                    txt = ' is ' + type;
                }
                console.log('' + name + '.' + prop + ' -> ' + txt);
            }
        }
    }

    export function logObjProps(name: string, myObject: any) {
        transverse(name, myObject, console.log)
    }

    // Definição da View para Todo (elemento individual)

    class View {
        private classDef: {};
        private attrsDef: {};
        private ITEM_TEMPLATE = [
            '<div class="view">',
            '   <input class="toggle" type="checkbox" {{#if completed}}checked{{/if}}>',
            '   <label>{{title}}</label>',
            '    <button class="destroy"></button>',
            '</div>',
            '<input class="edit" value="{{title}}">',
            ''].join('');

        constructor(private Y: YUI, private engine: Engine) {
            var itemTemplate = this.ITEM_TEMPLATE;
            this.attrsDef = {};
            this.classDef = {
                // The container element that the View is rendered under.
                containerTemplate: '<li>',

                // Compile our template using Template Engine.
                template: engine.compile(itemTemplate),

                // Bind DOM events for handling changes to a specific Todo,
                // for completion and editing.
                events: {
                    '.toggle': {
                        click: 'toggleComplete'
                    },
                    'label': {
                        dblclick: 'edit'
                    },
                    '.edit': {
                        blur: 'close',
                        keypress: 'enterUpdate'
                    },
                    '.destroy': {
                        click: 'clear'
                    }
                },

                // Initialize this view by setting event handlers when the Model
                // is updated or destroyed.
                initializer: function() {
                    var model = this.get('model');
                    model.after('change', this.render, this);
                },

                // Render this view in our <li> container, and fill it with the
                // data in our Model.
                render: function() {
                    var container = this.get('container');
                    var model = this.get('model');
                    // logObjProps('this.template', this.template);
                    container.setHTML(this.template(model.toJSON()));
                    container.toggleClass('completed', model.get('completed'));

                    this.set('inputNode', container.one('.edit'));

                    return this;
                },

                // Toggle the linked Todo's completion status.
                toggleComplete: function() {
                    this.get('model').toggle();
                },

                // Turn on editing mode for the Todo by exposing the input field.
                edit: function() {
                    var input = this.get('inputNode');

                    this.get('container').addClass('editing');
                    // place cursor at the end of the line
                    input._node.value = input._node.value;
                    input.focus();
                },

                // Get the value from our input field while hiding it, and
                // save it to our Todo when focus is lost from the field.
                close: function() {
                    var editedValue = this.get('inputNode').get('value');

                    this.get('container').removeClass('editing');

                    if (editedValue) {
                        this.get('model').save({
                            title: editedValue
                        });
                    } else {
                        this.clear();
                    }
                },

                // Also allow updating the Todo's text through the enter key.
                enterUpdate: function(e) {
                    var ENTER_KEY = 13;
                    if (e.keyCode === ENTER_KEY) {
                        this.close();
                    }
                },

                // Destroy the model when the delete button is clicked.
                clear: function() {
                    this.get('model').clear();
                }
            };
        }

        public getClassDef() { return this.classDef; }
        public getAttrsDef() { return this.attrsDef; }
    }

    var viewDependencies = ['view', 'handlebars', 'event-focus'];


    YUI.add('todo-view', function(Y) {
        var engine = Y.Handlebars;
        var view = new View(Y, engine);
        // -- Todo View -------------------
        var TodoViewModule = Y.Base.create('todoView', Y.View, [], view.getClassDef());

        // Set this View under our custom Y.TodoMVC namespace.
        Y.namespace('TodoMVC')['TodoView'] = TodoViewModule;
    }, TODO_MODULE_VERSION, { requires: viewDependencies });

    // Definição do Model para Todo (elemento individual)

    class Todo {
        private classDef: {};
        private attrsDef: {};
        constructor(private Y: YUI) {
            this.attrsDef = {
                // Default attributes.
                ATTRS: {
                    title: {
                        value: ''
                    },
                    completed: {
                        value: false
                    }
                }
            };
            this.classDef = {
                // Set up the root localStorage key we save our Model data in.
                root: TODO_LOCAL_STORAGE_KEY,

                // Toggle the completed state of the Todo.
                toggle: function() {
                    this.save({ completed: !this.get('completed') });
                },

                // Destroy this Todo and remove it from localStorage.
                clear: function() {
                    this.destroy({ remove: true });
                }
            };
        }

        public getClassDef() { return this.classDef; }
        public getAttrsDef() { return this.attrsDef; }
    }

    var modelDependencies = ['gallery-model-sync-local', 'model'];

    YUI.add('todo', function(Y) {
        var todo = new Todo(Y);
        // -- Todo Model -------------
        var TodoModule = Y.Base.create('todo', Y.Model, [Y.ModelSync.Local],
            todo.getClassDef(), todo.getAttrsDef());

        // Set this Model under our custom Y.TodoMVC namespace.
        Y.namespace('TodoMVC')['Todo'] = TodoModule;
    }, TODO_MODULE_VERSION, { requires: modelDependencies });


    // Definição do ModelList para Todo

    class TodoList {
        private classDef: {};
        constructor(private Y: YUI) {
            this.classDef = {
                // The related Model for our Model List.
                model: Y.TodoMVC.Todo,

                // The root used for our localStorage key.
                root: TODO_LOCAL_STORAGE_KEY,

                // Return a ModelList of our completed Models.
                completed: function() {
                    return this.filter({ asList: true }, function(todo) {
                        return todo.get('completed');
                    });
                },

                // Return an ModelList of our un-completed Models.
                remaining: function() {
                    return this.filter({ asList: true }, function(todo) {
                        return !todo.get('completed');
                    });
                }
            }
    }
        public getClassDef() { return this.classDef; }
    }

    var modelListDependencies = ['gallery-model-sync-local', 'model-list', 'todo'];

    YUI.add('todo-list', function(Y) {
        var todoList = new TodoList(Y);

        // -- TodoList Model list -----
        var TodoListModule = Y.Base.create('todoList', Y.ModelList, [Y.ModelSync.Local],
            todoList.getClassDef());

        // Set this Model List under our custom Y.TodoMVC namespace.
        Y.namespace('TodoMVC')['TodoList'] = TodoListModule;

    }, TODO_MODULE_VERSION, { requires: modelListDependencies });

    // Definição da App para Todo

    class App {
        private BODY_TEMPLATE = [
            '<section id="todoapp">',
            '  <header id="header">',
            '    <h1>todos</h1>',
            '    <input id="new-todo" placeholder="What needs to be done?" autofocus>',
            '  </header>',
            '  <section id="main">',
            '    <input id="toggle-all" type="checkbox"> ',
            '    <label for="toggle-all">Mark all as complete</label>',
            '    <ul id="todo-list"></ul>',
            '  </section>',
            '  <footer id="section-footer"></footer>',
            '</section>',
            '<footer id="footer-info">',
            '    <p>Double-click to edit a todo already created</p>',
            '    <p>',
            '        Created by <a href="https://github.com/joao-parana">João Antonio Ferreira</a>.',
            '        Based on <a href="http://todomvc.com">TodoMVC</a> implementation',
            '    </p>',
            '</footer>',
            ' '
        ].join('');

        private STATS_TEMPLATE = [
            '<span id="todo-count"><strong>{{remaining}}</strong> {{pluralize remaining "item"}} left</span>',
            '<ul id="filters">',
            '  <li>',
            '    <a class="selected" href="#/">All</a>',
            '  </li>',
            '  <li>',
            '    <a href="#/active">Active</a>',
            '  </li>',
            '  <li>',
            '    <a href="#/completed">Completed</a>',
            '  </li>',
            '</ul>',
            '{{#if completed}}',
            '<button id="clear-completed">Clear completed ({{completed}})</button>',
            '{{/if}}',
            ' '].join('');
        private classDef: {};
        private attrsDef: {};
        // templateEngine é Y.Handlebars
        constructor(private Y: YUI, templateEngine: Engine) {
            var myself = this;
            var doc = Y.config.doc;
            Y.one('body').append(this.BODY_TEMPLATE);
            var footerInfo = doc.getElementById('footer-info');
            if (footerInfo) {
                console.log('Conteudo para Progressive Enhancement criado.');
                // console.log('footerInfo com ID ' + footerInfo.id
                //  + ' e com ' + footerInfo.innerText.length
                //  + ' bytes de conteúdo foi criado corretamente');
            } else {
                throw new Error('Aplicação depende de BODY_TEMPLATE '
                    + 'estar renderizado no DOM.');
            }
            var statsTemplate = this.STATS_TEMPLATE;
            this.attrsDef = {
                ATTRS: {
                    todoList: {
                        'value': null,
                        'validator': function(v) {
                            if (v != null && v.name && v.name == 'todoList') {
                                console.log('Objeto todoList válido.');
                                return true;
                            }
                            return false;
                        }
                    },
                    // Significant DOM elements that relate to our application that
                    // we would like to keep as attributes.
                    container: {
                        valueFn: function() {
                            return Y.one('#todoapp');
                        }
                    },
                    inputNode: {
                        valueFn: function() {
                            return Y.one('#new-todo');
                        }
                    },
                    allCheckbox: {
                        valueFn: function() {
                            return Y.one('#toggle-all');
                        }
                    },
                    main: {
                        valueFn: function() {
                            return Y.one('#main');
                        }
                    },
                    footer: {
                        valueFn: function() {
                            return Y.one('#section-footer');
                        }
                    },

                    // This can be set to fall back on server-side routing when
                    // HTML5 pushState is not available. For this application,
                    // we are only using hash-based URLs though.
                    serverRouting: {
                        value: false
                    },

                    // Our initial filter for the application.
                    filter: {
                        value: null
                    },

                    // Routing for the application, to determine the filter.
                    // The callback takes a request object, Express-style.
                    routes: {
                        value: [{
                            path: '/:filter',
                            callback: 'handleFilter'
                        }]
                    },
                    appInstance: {
                        value: myself
                    }
                }
            };

            this.classDef = {
                // Set container to bind to the existing '#todoapp' element
                containerTemplate: '#todoapp',

                // Compile statistics template with Handlebars.
                template: templateEngine.compile(statsTemplate),

                // DOM events for creating new Todos and clearing out old ones.
                events: {
                    '#new-todo': {
                        keypress: 'enterCreate'
                    },
                    '#clear-completed': {
                        click: 'clearCompleted'
                    },
                    '#toggle-all': {
                        click: 'completeAll'
                    }
                },

                // Initialize our TodoList, and bind any events that occur
                // when new Todos are added, changed, or removed within it.
                // Also, fetch any Todos that are found within localStorage.
                initializer: function() {
                    // console.log('Entrei no construtor da App');
                    this.set('todoList', {});
                    this.set('todoList', new Y.TodoMVC.TodoList());

                    var list = this.get('todoList');

                    templateEngine.registerHelper('pluralize', function(context, word) {
                        return (context === 1) ? word : word + 's';
                    });

                    list.after(['add', 'remove', 'reset', 'todo:completedChange'],
                        this.render, this);

                    list.load();

                    // Keep our filters on refresh by immediately dispatching route.
                    this.once('ready', function() {
                        if (this.hasRoute(this.getPath())) {
                            this.dispatch();
                        }
                    });
                },

                // Render our application with the statistics from our TodoList,
                // and various other stylistic elements.
                render: function() {
                    var todoList = this.get('todoList');
                    var completed = todoList.completed().size();
                    var remaining = todoList.remaining().size();
                    var main = this.get('main');
                    var footer = this.get('footer');

                    // If we have Todos in our TodoList, show them with statistics.
                    if (todoList.size()) {
                        main.show();
                        footer.show();
                        footer.setHTML(this.template({
                            completed: completed,
                            remaining: remaining
                        }));

                        // Highlights for filters at the bottom of our Todo application.

                        footer.one('#filters li a').removeClass('selected');

                        footer.all('#filters li a').filter(
                            '[href="#/' + (this.get('filter') || '') + '"]')
                            .addClass('selected');
                    } else {
                        main.hide();
                        footer.hide();
                    }

                    // Set the checkbox only if all Todos have been completed.
                    this.get('allCheckbox').set('checked', !remaining);
                    this.addViews();
                },

                // Add Todo views to the DOM simultaneously, triggered when
                // the application initially loads, or we switch filters.
                addViews: function() {
                    var models;
                    // When running in Node.js, this property is `undefined`, 
                    // since there is no 'document' object.
                    var doc = Y.config.doc;
                    var frag: DocumentFragment = doc.createDocumentFragment();
                    var fragment: Y.Node = Y.one(frag);
                    var todoList = this.get('todoList');

                    // An Array of models is passed through when the 'reset'
                    // event is triggered through syncing through load().
                    var f = this.get('filter');
                    switch (f) {
                        case 'active':
                            models = todoList.remaining();
                            break;
                        case 'completed':
                            models = todoList.completed();
                            break;
                        default:
                            models = todoList;
                            break;
                    }

                    // Iterate through the (filtered) ModelList.
                    // console.log('temos ' + models._items.length
                    //    + ' itens na lista para o filtro ' + f)
                    models.each(function(model) {
                        var view = new Y.TodoMVC.TodoView({
                            model: model
                        });
                        var container: Y.Node = view.render().get('container');
                        fragment.append(container);
                    });

                    this.get('container').one('#todo-list').setContent(fragment);
                },

                // Create and save a new Todo from the inputted value when the
                // Enter key is pressed down.
                enterCreate: function(e) {
                    var ENTER_KEY = 13;
                    var todoList = this.get('todoList');
                    var inputNode = this.get('inputNode');
                    var value = inputNode.get('value');

                    if (e.keyCode !== ENTER_KEY || !value) {
                        return;
                    }

                    todoList.create({
                        title: value
                    });

                    inputNode.set('value', '');
                    // console.log('e.keyCode = ' + e.keyCode + ', value = ' + value);
                },

                // Clear all completed Todos from the TodoList. This removes the models
                // from the list, as well as deletes them from localStorage.
                clearCompleted: function() {
                    var todoList = this.get('todoList');
                    var completed = todoList.completed();

                    todoList.remove(completed);

                    completed.each(function(todo) {
                        todo.clear();
                    });
                },

                // Complete all non-complete Todos, or reset them all if they are
                // all already complete.
                completeAll: function() {
                    var todoList = this.get('todoList');
                    var allCheckbox = this.get('allCheckbox');
                    var completed = allCheckbox.get('checked');

                    todoList.each(function(todo) {
                        todo.save({
                            completed: completed
                        });
                    });
                },

                // Set the filter for our application from the route that is passed
                // in (see below). 
                handleFilter: function(req) {
                    var f = req.params.filter;
                    this.set('filter', f);
                    var todoList = this.get('todoList');
                    // console.log(todoList);
                    todoList.load();
                    // console.log('temos ' + todoList._items.length
                    //     + ' itens na lista para o filtro ' + f);
                    // logObjProps('todoList', todoList);
                    // logObjProps('todoList._items', todoList._items);
                }
            }
        }

        public getClassDef() { return this.classDef; }
        public getAttrsDef() { return this.attrsDef; }
    }

    var appDependencies = ['app-base', 'todo-list', 'todo-view', 'node', 'handlebars'];

    YUI.add('todo-app', function(Y) {
        var engine = Y.Handlebars;
        var app = new App(Y, engine);

        // Dependencies from MVC namespace.
        var TodoApp; 

        // -- Main Application --------------
        TodoApp = Y.Base.create('todoApp', Y.App, [], app.getClassDef(), app.getAttrsDef());

        // Namespace this application under our custom Y.MVC namespace.
        Y.namespace('TodoMVC')['TodoApp'] = TodoApp;
    }, TODO_MODULE_VERSION, { requires: appDependencies });
}


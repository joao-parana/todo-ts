var todomvc;
(function(h){"function"!=typeof String.prototype.a&&(String.prototype.a=function(a){return 0===this.indexOf(a)});h.logObjProps=function(a,b){var c;c=""+a+" is "+typeof b;b instanceof Array&&(c+=" and one instance of Array class with length "+b.length);console.log(c);for(var d in b)b.hasOwnProperty(d)&&!d.a("_")&&(c=b[d],c=typeof b[d],c="string"==c||"number"==c||"boolean"==c?" is "+c+" : "+b[d]:" is "+c,console.log(""+a+"."+d+" -> "+c))};var k=function(){return function(a,b){var c=this.c='<div class="view">   <input class="toggle" type="checkbox" {{#if completed}}checked{{/if}}>   <label>{{title}}</label>    <button class="destroy"></button></div><input class="edit" value="{{title}}">';
this.attrsDef={};this.classDef={containerTemplate:"<li>",template:b.compile(c),events:{".toggle":{click:"toggleComplete"},label:{dblclick:"edit"},".edit":{blur:"close",keypress:"enterUpdate"},".destroy":{click:"clear"}},initializer:function(){this.get("model").after("change",this.render,this)},render:function(){var d=this.get("container"),a=this.get("model");d.setHTML(this.template(a.toJSON()));d.toggleClass("completed",a.get("completed"));this.set("inputNode",d.one(".edit"));return this},toggleComplete:function(){this.get("model").toggle()},
edit:function(){var a=this.get("inputNode");this.get("container").addClass("editing");a.e.value=a.e.value;a.focus()},close:function(){var a=this.get("inputNode").get("value");this.get("container").removeClass("editing");a?this.get("model").save({title:a}):this.clear()},enterUpdate:function(a){13===a.keyCode&&this.close()},clear:function(){this.get("model").clear()}}}}();YUI.add("todo-view",function(a){var b=new k(a,a.Handlebars),b=a.Base.create("todoView",a.View,[],b.classDef);a.namespace("TodoMVC").TodoView=
b},"1.0.1",{requires:["view","handlebars","event-focus"]});var l=function(){return function(){this.attrsDef={ATTRS:{title:{value:""},completed:{value:!1}}};this.classDef={root:"all-todos-yui-ts",toggle:function(){this.save({completed:!this.get("completed")})},clear:function(){this.destroy({remove:!0})}}}}();YUI.add("todo",function(a){var b=new l(a),b=a.Base.create("todo",a.Model,[a.ModelSync.Local],b.classDef,b.attrsDef);a.namespace("TodoMVC").Todo=b},"1.0.1",{requires:["gallery-model-sync-local",
"model"]});var m=function(){return function(a){this.classDef={model:a.TodoMVC.Todo,root:"all-todos-yui-ts",completed:function(){return this.filter({asList:!0},function(a){return a.get("completed")})},remaining:function(){return this.filter({asList:!0},function(a){return!a.get("completed")})}}}}();YUI.add("todo-list",function(a){var b=new m(a),b=a.Base.create("todoList",a.ModelList,[a.ModelSync.Local],b.classDef);a.namespace("TodoMVC").TodoList=b},"1.0.1",{requires:["gallery-model-sync-local","model-list",
"todo"]});var n=function(){return function(a,b){this.b='<section id="todoapp">  <header id="header">    <h1>todos</h1>    <input id="new-todo" placeholder="What needs to be done?" autofocus>  </header>  <section id="main">    <input id="toggle-all" type="checkbox">     <label for="toggle-all">Mark all as complete</label>    <ul id="todo-list"></ul>  </section>  <footer id="section-footer"></footer></section><footer id="footer-info">    <p>Double-click to edit a todo already created</p>    <p>        Created by <a href="https://github.com/joao-parana">Jo\u00e3o Antonio Ferreira</a>.        Based on <a href="http://todomvc.com">TodoMVC</a> implementation    </p></footer> ';
this.d='<span id="todo-count"><strong>{{remaining}}</strong> {{pluralize remaining "item"}} left</span><ul id="filters">  <li>    <a class="selected" href="#/">All</a>  </li>  <li>    <a href="#/active">Active</a>  </li>  <li>    <a href="#/completed">Completed</a>  </li></ul>{{#if completed}}<button id="clear-completed">Clear completed ({{completed}})</button>{{/if}} ';var c=a.config.doc;a.one("body").append(this.b);if(c.getElementById("footer-info"))console.log("Conteudo para Progressive Enhancement criado.");
else throw Error("Aplica\u00e7\u00e3o depende de BODY_TEMPLATE estar renderizado no DOM.");c=this.d;this.attrsDef={ATTRS:{todoList:{value:null,validator:function(a){return null!=a&&a.name&&"todoList"==a.name?!0:!1}},container:{valueFn:function(){return a.one("#todoapp")}},inputNode:{valueFn:function(){return a.one("#new-todo")}},allCheckbox:{valueFn:function(){return a.one("#toggle-all")}},main:{valueFn:function(){return a.one("#main")}},footer:{valueFn:function(){return a.one("#section-footer")}},
serverRouting:{value:!1},filter:{value:null},routes:{value:[{path:"/:filter",callback:"handleFilter"}]},appInstance:{value:this}}};this.classDef={containerTemplate:"#todoapp",template:b.compile(c),events:{"#new-todo":{keypress:"enterCreate"},"#clear-completed":{click:"clearCompleted"},"#toggle-all":{click:"completeAll"}},initializer:function(){this.set("todoList",new a.TodoMVC.TodoList);var d=this.get("todoList");b.registerHelper("pluralize",function(a,d){return 1===a?d:d+"s"});d.after(["add","remove",
"reset","todo:completedChange"],this.render,this);d.load();this.once("ready",function(){this.hasRoute(this.getPath())&&this.dispatch()})},render:function(){var a=this.get("todoList"),b=a.completed().size(),c=a.remaining().size(),e=this.get("main"),g=this.get("footer");a.size()?(e.show(),g.show(),g.setHTML(this.template({completed:b,remaining:c})),g.one("#filters li a").removeClass("selected"),g.all("#filters li a").filter('[href="#/'+(this.get("filter")||"")+'"]').addClass("selected")):(e.hide(),
g.hide());this.get("allCheckbox").set("checked",!c);this.addViews()},addViews:function(){var b,c=a.one(a.config.doc.createDocumentFragment());b=this.get("todoList");switch(this.get("filter")){case "active":b=b.remaining();break;case "completed":b=b.completed();break}b.each(function(b){b=(new a.TodoMVC.TodoView({model:b})).render().get("container");c.append(b)});this.get("container").one("#todo-list").setContent(c)},enterCreate:function(a){var b=this.get("todoList"),c=this.get("inputNode"),e=c.get("value");
13===a.keyCode&&e&&(b.create({title:e}),c.set("value",""))},clearCompleted:function(){var a=this.get("todoList"),b=a.completed();a.remove(b);b.each(function(a){a.clear()})},completeAll:function(){var a=this.get("todoList"),b=this.get("allCheckbox").get("checked");a.each(function(a){a.save({completed:b})})},handleFilter:function(a){this.set("filter",a.params.filter);this.get("todoList").load()}}}}();YUI.add("todo-app",function(a){var b=new n(a,a.Handlebars),b=a.Base.create("todoApp",a.App,[],b.classDef,
b.attrsDef);a.namespace("TodoMVC").TodoApp=b},"1.0.1",{requires:["app-base","todo-list","todo-view","node","handlebars"]})})(todomvc||(todomvc={}));

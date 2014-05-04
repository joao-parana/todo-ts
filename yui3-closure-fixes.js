/* Tell compiler to not rename addClass, hasClass, removeClass 
 * and toggleClass methods from YUI.Apollo */
var exports = {};
exports.addClass = function() {
};
exports.hasClass = function() {
};
exports.removeClass = function() {
};
exports.toggleClass = function() {
};

/* Tell compiler to not rename YUI3 add and use methods */
var YUI = function() {
};
YUI.add = function(moduleName, definition, version, requires) {
};
YUI.use = function(moduleName, definition) {
};

/* Tell compiler to not rename YUI3 augment and other methods */
var Y = {};
Y.augment = function(clazz, target) {
};
Y.namespace = function() {
};
Y.one = function() {
};
Y.all = function() {
};
Y.setHTML = function() {
};
Y.setContent = function() {
};
Y.each = function(n,i,c) {};

/* Tell compiler to not rename YUI3 Attribute class methods addAttrs, addAttr */
Y.Attribute = function() {
};
Y.Attribute.prototype.addAttr = function() {
};
Y.Attribute.prototype.addAttrs = function(attrsDef, defaultValues) {
};

/* Tell compiler to not rename YUI3 Node class methods addClass, hasClass */
Y.Node.prototype.addClass = function(text) {
};
Y.Node.prototype.hasClass = function(text) {
};

Y.Handlebars = {};
Y.Base = {
	create : {}
};
Y.Model = {};
Y.ModelList = {};
Y.ModelSync = {
	Local : {}
};

Y.View = {};
Y.App = {};

var appMethods = {
	hasRoute : {},
	getPath : {},
	dispatch : {}
};

Y.config = {
	doc : {}
};

/* Tell compiler to not rename my Electron class method addAttrs */
// var Electron = function(){};
/* méthod which to be augmented */
// Electron.prototype.addAttrs = function(attrsDef, defaultValues){};
/* Tell compiler to not rename YUI3 Electron class methods on, after */
Y.Electron = function() {
};
Y.Electron.prototype.on = function(eventName, callback) {
};
Y.Electron.prototype.after = function(eventName, callback) {
};

Y.TodoMVC = {
	Todo : {},
	TodoList : {},
	TodoView : {}
};

var todomvc = {
	logObjProps : function() {
	}
};

/* Tell compiler to not rename properties off Event evt */
var evt = {};
evt.prevVal = {};
evt.newVal = {};

var requisitos = {
	requires : []
};
var f = {
	asList : true
};

/* Tell compiler to not rename attributes and methods from our class */

var attrAndEvents = {
	basicEvents : {
		on : {},
		after : {},
		load : {},
		once : {},
		save : {},
	}
};
var modelListAttrAndEvents = {
	model : {},
	root : '',
	asList : true,
	completed : function() {
	},
	remaining : function() {
	}
};

var modelAttrAndEvents = {
	remove : {},
	destroy : {},
	attrsDef : {
		ATTRS : {
			title : {
				value : ''
			},
			completed : {
				value : {}
			}
		}
	},
	classDef : {
		root : '',
		toggle : function() {
		},
		clear : function() {
		}
	}
};
var viewAttrAndEvents = {
	containerTemplate : '',

	events : {
		'.toggle' : {
			click : ''
		},
		'label' : {
			dblclick : ''
		},
		'.edit' : {
			blur : '',
			keypress : ''
		},
		'.destroy' : {
			click : ''
		}
	},
	methods : {
		initializer : function() {
		},
		render : function() {
		},
		toggleComplete : function() {
		},
		edit : function() {
		},
		close : function() {
		},
		enterUpdate : function() {
		},
		clear : function() {
		}
	}
};

var appAttrAndEvents = {
	todoList : {},
	// Significant DOM elements that relate to our application that
	// we would like to keep as attributes.
	container : {
		valueFn : function() {
		}
	},
	inputNode : {},
	allCheckbox : {},
	main : {},
	footer : {},
	serverRouting : {
		value : {}
	},
	filter : {
		value : {}
	},
	routes : {
		value : [ {
			path : '/:filter',
			callback : 'handleFilter'
		} ]
	},
	appInstance : {
		value : {}
	}
};
/* Tell compiler to not rename attributes and methods from Handlebars */
var engine = {
	templateEngine : {
		registerHelper : function() {
		},
		compile : function() {
		}
	}
};

var placeholder = {
	completed : {},
	remaining : {}
};

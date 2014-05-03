/* Tell compiler to not rename addClass, hasClass, removeClass 
 * and toggleClass methods from YUI.Apollo */
var exports = {};
exports.addClass = function(){};
exports.hasClass = function(){};
exports.removeClass = function(){};
exports.toggleClass = function(){};

/* Tell compiler to not rename YUI3 add and use methods  */
var YUI = function(){};
YUI.add = function(moduleName, definition, version, requires){};
YUI.use = function(moduleName, definition){};

/* Tell compiler to not rename YUI3 augment methods  */
var Y = {};
Y.augment = function(clazz, target){};
Y.namespace = function(){};

/* Tell compiler to not rename YUI3 Attribute class methods addAttrs, addAttr */
Y.Attribute = function(){};
Y.Attribute.prototype.addAttr = function(){};
Y.Attribute.prototype.addAttrs = function(attrsDef, defaultValues){};

/* Tell compiler to not rename YUI3 Node class methods addClass, hasClass */
Y.Node.prototype.addClass = function(text){};
Y.Node.prototype.hasClass = function(text){};

Y.Handlebars = {};
Y.Base = { create : {} };
Y.Model = {};
Y.ModelList = {};
Y.ModelSync = { Local: {} };

Y.View = {};
Y.App = {};

Y.config = { doc: {} };



/* Tell compiler to not rename my Electron class method addAttrs */
// var Electron = function(){};
/* méthod which to be augmented  */
// Electron.prototype.addAttrs = function(attrsDef, defaultValues){};


/* Tell compiler to not rename YUI3 Electron class  methods on, after  */
Y.Electron = function(){};
Y.Electron.prototype.on = function(eventName, callback){};
Y.Electron.prototype.after = function(eventName, callback){};

Y.TodoMVC = { Todo: {} };

/* Tell compiler to not rename properties off Event evt   */
var evt = {};
evt.prevVal = {};
evt.newVal = {};

var requisitos = { requires: [] };
var f = { asList: true };

/* Tell compiler to not rename attributes and methods from our class  */


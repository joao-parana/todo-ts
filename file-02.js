/**
 * Usando a classe Y.Attribute com Clousure Compiler e opção --externs
 * 'yui3-closure-fixes.js'
 */
(function(window, document, YUI, undefined) {

	'use strict';
	
	// Veja o projeto Apollo - https://github.com/toddmotto/apollo
	(function(root) {
		var cssClassFunctionFactory = function() {

			'use strict';

			var exports = {}, _hasClass, _addClass, _removeClass, _toggleClass;

			var _forEach = function(classes, callback) {
				if (Object.prototype.toString.call(classes) !== '[object Array]') {
					classes = classes.split(' ');
				}
				for (var i = 0; i < classes.length; i++) {
					callback(classes[i], i);
				}
			};

			if (document.documentElement.classList) {
				_hasClass = function(elem, className) {
					return elem.classList.contains(className);
				};
				_addClass = function(elem, className) {
					elem.classList.add(className);
				};
				_removeClass = function(elem, className) {
					elem.classList.remove(className);
				};
				_toggleClass = function(elem, className) {
					elem.classList.toggle(className);
				};
			} else {
				_hasClass = function(elem, className) {
					return new RegExp('(^|\\s)' + className + '(\\s|$)')
							.test(elem.className);
				};
				_addClass = function(elem, className) {
					if (!exports.hasClass(elem, className)) {
						elem.className += (elem.className ? ' ' : '')
								+ className;
					}
				};
				_removeClass = function(elem, className) {
					if (exports.hasClass(elem, className)) {
						elem.className = elem.className.replace(new RegExp(
								'(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
					}
				};
				_toggleClass = function(elem, className) {
					var toggle = exports.hasClass(elem, className) ? exports.removeClass
							: exports.addClass;
					toggle(elem, className);
				};
			}

			exports.hasClass = function(elem, className) {
				return _hasClass(elem, className);
			};

			exports.addClass = function(elem, classes) {
				_forEach(classes, function(className) {
					_addClass(elem, className);
				});
			};

			exports.removeClass = function(elem, classes) {
				_forEach(classes, function(className) {
					_removeClass(elem, className);
				});
			};

			exports.toggleClass = function(elem, classes) {
				_forEach(classes, function(className) {
					_toggleClass(elem, className);
				});
			};

			return exports;
		};

		if (typeof define === 'function' && define.amd) {
			// usando com RequireJS
			define(cssClassFunctionFactory);
		} else if (typeof exports === 'object') {
			module.exports = cssClassFunctionFactory;
		} else {
			if (root['CSS']) {
				console.error("root['CSS'] já existe");
			} else {
				root['CSS'] = cssClassFunctionFactory();
			}
		}
	})(YUI);

	// hasOwnProperty

	function Electron(defaultValues) {
		// Constantes
		var REST_ENERGY = 511.00;
		this.addAttrs({
			'charge' : {
				'value' : -1,
				'readOnly' : true
			},
			'energy' : {
				'value' : REST_ENERGY,
				'validator' : function(en) {
					return (en >= REST_ENERGY);
				}
			}
		}, defaultValues);
	}

	console.log('Vou adicionar o Eletron na infra do YUI');
	
	YUI.add('electron', function(Y) {
		Y.Electron = Y.augment(Electron, Y.Attribute);
	}, '1.0', {
		'requires' : [ 'attribute' ]
	});

	YUI().use('electron', eletronDef);

	function eletronDef(Y) {
		// Crio o primeiro elétron
		var e1 = new Y.Electron({
			'energy' : 708.72,
			'charge' : 2
		});
		console.log("e1's energy is " + e1.get('energy') + ' MeV.');
		console.log("e1's charge is " + e1.get('charge'));

		// Crio o segundo elétron
		var e2 = new Y.Electron();
		e2.on('energyChange', function(evt) {
			console.log("Trying to change e2's energy to " + evt.newVal
					+ ' ...');
		});
		e2.after('energyChange', function(evt) {
			console.log("e2's energy changed from " + evt.prevVal + ' to '
					+ evt.newVal);
		});

		// Altero atributos do segundo elétron
		e2.set('energy', 400);
		e2.set('energy', 1200);
	}

})(window, document, YUI);

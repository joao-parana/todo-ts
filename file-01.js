/**
 * Usando a classe Y.Attribute com Clousure Compiler
 */

function Electron(config) {
	// Constantes
	var REST_ENERGY = 511.00;
	this['addAttrs']({
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
	}, config);
}

YUI.add('electron', function(Y) {
	Y['Electron'] = Y['augment'](Electron, Y['Attribute']);
}, '1.0', {
	'requires' : [ 'attribute' ]
});

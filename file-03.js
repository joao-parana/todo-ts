/// <reference path="ts/yui.d.ts" />
/// <reference path="ts/my-yui-modules.d.ts" />
var Electron = (function () {
    function Electron(defaultValues) {
        this.defaultValues = defaultValues;
        // Constantes
        var REST_ENERGY = 511.00;
        this.addAttributes({
            'charge': {
                'value': -1,
                'readOnly': true
            },
            'energy': {
                'value': REST_ENERGY,
                'validator': function (en) {
                    return (en >= REST_ENERGY);
                }
            }
        }, defaultValues);
    }
    Electron.prototype.addAttributes = function (cfgs, values, lazy) {
        // Este método abaixo é "augmented" de Y.Attribute e preciso usar
        // a var myself : any para evitar erro de compilaçãõ no TypeScript
        var myself;
        myself = this;
        myself.addAttrs(cfgs, values, lazy || false);
    };
    return Electron;
})();

YUI.add('electron', function (Y) {
    Y.Electron = Y.augment(Electron, Y.Attribute);
}, '1.0', { 'requires': ['attribute'] });

// Usando o Módulo
YUI().use('electron', eletronUtilization);

function eletronUtilization(Y) {
    // Crio o primeiro elétron
    var e1 = new Y.Electron({
        'energy': 708.72,
        'charge': 2
    });
    console.log("e1's energy is " + e1.get('energy') + ' MeV.');
    console.log("e1's charge is " + e1.get('charge'));

    // Crio o segundo elétron
    var e2 = new Y.Electron();
    e2.on('energyChange', function (evt) {
        console.log("Trying to change e2's energy to " + evt.newVal + ' ...');
    });
    e2.after('energyChange', function (evt) {
        console.log("e2's energy changed from " + evt.prevVal + ' to ' + evt.newVal);
    });

    // Altero atributos do segundo elétron
    e2.set('energy', 400);
    e2.set('energy', 1200);
}

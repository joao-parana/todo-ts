/// <reference path="tsUnit.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test;
(function (test) {
    var Composer = (function () {
        function Composer() {
        }
        Composer.compose = function (test) {
            test.addTestClass(new DeliberateFailures(), 'DeliberateFailures');
        };
        return Composer;
    })();
    test.Composer = Composer;

    var DeliberateFailures = (function (_super) {
        __extends(DeliberateFailures, _super);
        function DeliberateFailures() {
            _super.apply(this, arguments);
        }
        DeliberateFailures.prototype.deliberatedBadTest = function () {
            this.areIdentical('Este erro foi provocado de propósito', 1);
        };
        return DeliberateFailures;
    })(tsUnit.TestClass);
})(test || (test = {}));

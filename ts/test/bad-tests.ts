/// <reference path="tsUnit.ts" />

module test {
    export class Composer {
        static compose(test: tsUnit.Test) {
            test.addTestClass(new DeliberateFailures(), 'DeliberateFailures');
        }
    }

    class DeliberateFailures extends tsUnit.TestClass {
        public deliberatedBadTest() {
            this.areIdentical('Este erro foi provocado de propósito.'
                + ' Pode ser ignorado com segurança', 1);
        }
    }
}

/// <reference path="tsUnit.ts" />
/// <reference path="tests.ts" />
/// <reference path="bad-tests.ts" />

window.onload = function() {
    // Referência para o Test Framework tsUnit
    var testFWK = new tsUnit.Test();
    // Nossos Test Cases disponível em tests.ts
    tests.Composer.compose(testFWK);
    // Forçamos erro de propósito para validar o funcionamento do 
    // Framework. A definição desse erro está em bad-tests.ts
    test.Composer.compose(testFWK);
    testFWK.showResults(document.getElementById('result'), testFWK.run());
};

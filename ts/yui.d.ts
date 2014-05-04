// Type definitions for yui 3
// Project: https://github.com/yui/yui3
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="yui-test.d.ts" />
 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Posso adicionar métodos a interfaces padrão e depois prover a 
// implementação com Polyfill escrito em JavaScript.
interface Array {
    // shuffle: () => any; // posso usar assim: [1, 3, 2].shuffle();
}

interface String {
    startsWith: Function;
    endsWith: Function;
}

interface Engine {
    compile(src: string): void
    registerHelper(name: string, func: Function)
}

interface YAttribute {
    addAttr(k: string, o: any): any
    addAttrs(k: string, o: any): any
    addTarget(k: string, o: any): any
    after(k: string, o: any): any
    attrAdded(k: string, o: any): any
    before(k: string, o: any): any
    bubble(k: string, o: any): any
    detach(k: string, o: any): any
    detachAll(k: string, o: any): any
    fire(k: string, o: any): any
    get(o: any): any
    getAttrs(k: string): any
    getEvent(type: string, o: any): any
    getTargets(): any
    modifyAttr(k: string, o: any): any
    on(k: string, fn: Function, context: {}, o: any): any
    once(k: string, fn: Function, context: {}, o: any): any
    onceAfter(k: string, fn: Function, context: {}, o: any): any
    parseType(k: string, o: any): any
    publish(k: string, o: any): any
    removeAttr(k: string): any
    removeTarget(o: any): any
    reset(k: string): any
    set(k: string, o: any): any
    setAttrs(k: string, o: any): any
}

interface YModelSync {
    Local: any
}
interface YUI {
    // Teste unitário
    Test: YUITest.YUITestStatic
    Assert: YUITest.IAssert

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // Referencia para atributos e Classes CORE do YUI no namespace Y do YUI
    config: Y.config
    Attribute: YAttribute
    Base: any
    App: any
    Model: any
    ModelList: any
    ModelSync: YModelSync
    View: any

    // Referencia para  Classes fora do CORE do YUI no namespace Y
    Handlebars: any
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    namespace(name: string)
    add(name: string, fn: (Y: YUI, name?: string) => any, version: string, details?: Y.IConfig): YUI;
    use(name: string, fn: (Y: YUI, name?: string) => any): YUI;

    // add(name: string, fn: () => Void, version: string , dependencies: [] )
    mix(receiver: Function, supplier: Function, overwrite?: boolean, whitelist?: string[], mode?: number, merge?: boolean): any//Function|Object|YUI
    mix(receiver: Object, supplier: Function, overwrite?: boolean, whitelist?: string[], mode?: number, merge?: boolean): any//Function|Object|YUI
    mix(receiver: Function, supplier: Object, overwrite?: boolean, whitelist?: string[], mode?: number, merge?: boolean): any//Function|Object|YUI
    mix(receiver: Object, supplier: Object, overwrite?: boolean, whitelist?: string[], mode?: number, merge?: boolean): any//Function|Object|YUI

    one(seletor: string): Y.Node
    one(frag: DocumentFragment): Y.Node
    all(seletor: string): Y.Node
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    augment(clazz: any, other: any)

    (config?: any): YUI;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // Referencia para Minhas Classes no namespace Y
    Electron: any
    TodoMVC: Y.TodoMVC
}

declare module Y {
    interface IConfig {
        requires: string[]
        optional?: string[]
        use?: string[]
    }

    interface TodoMVC {
        TodoView: any
        TodoList: any
        Todo: any         
        TodoApp : any
    }
    interface config {
        doc: Document
    }
    interface Node {
        one(seletor: string): Y.Node
        one(frag: DocumentFragment): Y.Node
        all(seletor: string): Y.Node
        getHTML(): string
        append(container);
    }
}

declare var Y: YUI;
declare var YUI: YUI;


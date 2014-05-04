# YUI TodoMVC Example

> In Typescript file **todo.ts** - [see src](https://github.com/joao-parana/todo-ts/blob/master/ts/todo.ts) we need to export only buildAndStart () and appInstance used respectively to create and launch the application / access after creation. The application implementation is added to the NameSpace YUI3 by call YUI.add (...) method; and is available to be used by the called method YUI.use (...); 
> Note that the builders get the instance of YUI object provided by the script available at: "http://yui.yahooapis.com/3.16.0/build/yui/yui-min.js"

##### See the HTML file below

```xml
    <!doctype html>
    <html lang="en" data-framework="yui">
    <head>
    <meta charset="utf-8">
    <title>YUI • TodoMVC implemented using TypeScript</title>
    <script src="http://cdn.alloyui.com/2.0.0/aui/aui-min.js"></script>
    <link href="http://cdn.alloyui.com/2.0.0/aui-css/css/bootstrap.min.css" rel="stylesheet"></link>
    </head>
    <body>
	    <!-- other content -->
	    <script>
	      todomvc.buildAndStart();
	    </script>
    </body>
    </html>
```

##### YUI is a free, open source JavaScript and CSS library for building richly interactive web applications.

> _[YUI - yuilibrary.com](http://yuilibrary.com)_

## Learning YUI

The [YUI website](http://yuilibrary.com) is a great resource for getting started.

Here are some links you may find helpful:

* [Documentation](http://yuilibrary.com/yui/docs)
* [Quick Start](http://yuilibrary.com/yui/quick-start)
* [Tutorials](http://yuilibrary.com/yui/docs/tutorials)
* [Examples](http://yuilibrary.com/yui/docs/examples)
* [Blog](http://yuiblog.com)

Get help from other YUI users:

* [YUI on StackOverflow](http://stackoverflow.com/questions/tagged/yui)
* [Forms](http://yuilibrary.com/forum)
* [YUI on Twitter](http://twitter.com/yuilibrary)

> If you want to use the Bootstrap library for easy layout you can donwload [AlloyUI](http://alloyui.com/versions/2.0.x/) that already includes the YUI 3 and Bootstrap 2.3.2 and have many cool widgets.


_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/joao-parana/todo-ts/issues)._


## Build all .js files (full, minified, gziped)

    cd ts
    tsc todo.ts
    cp todo.js ../todo-ts.js
    cd ..
    # usando o Closure Compiler
    export GOOG_HOME=/usr/docs/closure-library
    java -jar $GOOG_HOME/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js todo-ts.js --js_output_file todo-ts-min.js --externs yui3-closure-fixes.js
    gzip -9 -c todo-ts-min.js > todo-ts-min.js.gz
 

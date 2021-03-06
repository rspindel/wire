# wire.js

Wire.js is an [Inversion of Control Container](http://martinfowler.com/articles/injection.html "Inversion of Control Containers and the Dependency Injection pattern") for Javascript apps.

With wire.js, you can focus on coding the business logic of your components and let wire.js handle the bootstrapping and the glue that connects them together.  You write a simple wiring spec in JSON (or Javascript) that describes how your components should be wired together, and wire will load, configure, and connect those components to create your application, and will clean them up later.

### Specifically, wire.js provides:

* Component lifecycle management
* Dependency Inversion via constructor and setter Dependency Injection
* Automatic dependency ordering
* Connectors
* Service locator pattern and reference resolution

### Plugins

Wire.js also has a plugin architecture that allows plugins to provide new capabilities to wire.js *and syntax* to wiring specs.  Here are some of the capabilities provided by the bundled plugins:

* Dependency Injection for DOM nodes.  For example, you can reference DOM nodes by id *or dom query*, and inject them into your views.
* Event and PubSub connectors. Write your components without any glue code, and connect them together in the wiring spec using events or pubsub.  The event connector works for DOM nodes, too!
* Aspect Oriented Programming (AOP).  Wire.js comes with an AOP plugin that allows you to declaratively apply decorators, before/after/around advice, and to introduce mixins on the fly.

### Framework integration

Plugins also allow you to use capabilities of your existing modules/libraries/frameworks.  For example, wire.js has a set of plugins for Dojo that allow it to integrate with Dijit's widget system, to use dojo.connect as the event connector, and dojo.publish/subscribe as the pubsub connector.  If you are already using those aspects of Dojo, you can use wire.js's Dojo plugins to integrate easily with all your existing components.

# Ok, What Now?

1. [Read about](https://github.com/briancavalier/hello-wire.js) and [try out](http://briancavalier.com/code/hello-wire) the Hello Wire introduction.
1. Check out the [wire.js presentation from JSConf 2011](http://bit.ly/mkWy1L "wire.js - Javascript IOC Container w/Dependency Injection").
1. Get the code for the [Piratescript or N00bscript](https://github.com/briancavalier/piratescript) game from the presentation. *Docs coming soon!*
1. See the [wiki for more documentation](https://github.com/briancavalier/wire/wiki).
1. Fork it and try it out!

# What's new

### 0.5.1

* `create` factory now supports the `isConstructor` option, when `true`, forces an object instance to be created using `new`.
* Improved debug output when using `wire/debug` plugin,
* Slimmed down `wire/aop` plugin in preparation for a new version in an upcoming release,
* Automated unit tests using [Dojo DOH](http://dojotoolkit.org/reference-guide/util/doh.html), 
* Semantic versioning

### 0.5

* Re-engineered core: smaller, faster, and more loader-independent,
* Can be used as either an AMD module or an AMD plugin,
* Tested with [curl.js](https://github.com/unscriptable/curl), and [RequireJS](http://requirejs.org/).  Should also work with the upcoming [dojo 1.7 loader](http://dojotoolkit.org/) (but hasn't been tested yet),
* Improved plugin system,
* AOP plugin, `wire/aop`: Decorators and Introductions.  *Coming Soon*: before, after, afterReturning, afterThrowing, and around advice,
* Prototype factory plugin allows using the JS prototype chain to create new objects directly from other objects in your wire spec.
* Sizzle plugin, `wire/sizzle`, courtesy of [@unscriptable](https://twitter.com/unscriptfable)
* Not entirely new to 0.5, but worth mentioning Dojo integration, including:
	* pubsub connector, subscribe *and publish* non-invasively using `dojo.publish/subscribe`
	* event connector that uses dojo.connect
	* easy JsonRest datastores via `resource!` reference resolver
	* `dom.query!` reference resolver that uses `dojo.query`

# Roadmap

* More documentation
* AOP before, after, afterReturning, afterThrowing, and around advice
* AOP weaving.  Apply cross-cutting AOP via pointcut queries
* AMD Build API and build tool integrations.
* Defer module loading, and object creation or initialization (lazy load, create, init) until object is referenced or used.
* Fully automated test suite. (Test suite is comprehensive, but manual right now)
* Support for more AMD loaders
* Integration with more libs and frameworks.
* Node.js support
* More modular, reusable wire specs by "#include"ing one spec in another

# License

wire.js is licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php).

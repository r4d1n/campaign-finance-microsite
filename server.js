/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	// require('babel/register');

	var config = __webpack_require__(1);

	var express = __webpack_require__(2);
	var path = __webpack_require__(3);
	var bodyParser = __webpack_require__(4);
	var exphbs  = __webpack_require__(5);


	// react, router, and routes for server side Render
	var React = __webpack_require__(6);
	var Router = __webpack_require__(7);
	var routes = __webpack_require__(8);

	var app = express();


	if (process.env.NODE_ENV==='development' || process.env.NODE_ENV==='test') {
	  var env = __webpack_require__(32);
	  env('.env');
	}

	// mongodb connection
	var mongoose = __webpack_require__(33);

	if (process.env.NODE_ENV==='development') {
	  mongoose.connect('mongodb://localhost/' + config.DEV_DB);
	  console.log(process.env.NODE_ENV)
	  // require('./lib/sunlightRequest').init()
	}

	if (process.env.NODE_ENV==='test') {
	  mongoose.connect('mongodb://localhost/' + config.TEST_DB);
	}

	if (process.env.NODE_ENV==='production') {
	  mongoose.connect(process.env.MONGOLAB_URI);
	}

	// register handlebars
	app.engine('.hbs', exphbs({
	  defaultLayout: 'main',
	  partialsDir: 'views/partials/',
	  extname: '.hbs'
	}));
	app.set('view engine', '.hbs');

	app.use(express.static(__dirname + '/public'));

	// routes
	app.use('/api/records', __webpack_require__(34));
	// app.use('*', require('./routes/index')); // render views

	app.get('*', function (req, res) {
	  // React Routing


	  // res.render('index');
	  Router.run(routes, req.path, function (Handler, state) {
	    var element = React.createElement(Handler);
	    var html = React.renderToString(element);
	    res.render('main', { content: html });
	  });

	});


	app.locals.development = !!(process.env.NODE_ENV==='development');

	// to support URL-encoded bodies
	app.use(bodyParser.urlencoded({ extended: true }))

	var port = process.env.PORT || 3000;
	var server = app.listen(port, function () {

	  var host = server.address().address
	  var port = server.address().port

	  console.log('App listening at http://%s:%s', host, port)

	})

	module.exports = app;

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
		"DEV_DB": "campaign-dev",
		"TEST_DB": "campaign-test"
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express-handlebars");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);

	// react router and top level components

	var _require = __webpack_require__(7);

	var Route = _require.Route;
	var DefaultRoute = _require.DefaultRoute;
	var NotFoundRoute = _require.NotFoundRoute;

	var App = __webpack_require__(9),
	    CurrentCampaign = __webpack_require__(21),
	    PriorCampaign = __webpack_require__(30);

	/* export react routes for BOTH client and server use */

	module.exports = [React.createElement(
	  Route,
	  { path: '/', handler: App },
	  React.createElement(DefaultRoute, { handler: CurrentCampaign }),
	  React.createElement(NotFoundRoute, { handler: CurrentCampaign }),
	  React.createElement(Route, { name: 'current', path: 'current', handler: CurrentCampaign }),
	  React.createElement(Route, { name: 'prior', path: 'prior/:year', handler: PriorCampaign })
	)];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Router, React, Reflux) {/** @jsx React.DOM */'use strict';

	// external deps
	let ajax = __webpack_require__(11);

	// flux
	let $__0=    __webpack_require__(12),updateSelectedCandidate=$__0.updateSelectedCandidate;
	let Store = __webpack_require__(13)

	// router
	let $__1=       Router,Route=$__1.Route,DefaultRoute=$__1.DefaultRoute,RouteHandler=$__1.RouteHandler,Link=$__1.Link;


	// child components
	let YearSelect = __webpack_require__(17)
	, Amount = __webpack_require__(19)
	, Share = __webpack_require__(20)
	, CurrentCampaign = __webpack_require__(21)



	let App = React.createClass({displayName: "App",

	  mixins: [
	    Reflux.connect(__webpack_require__(13), 'activeCandidate'),
	    Reflux.connect(__webpack_require__(18), 'activeYear'),
	    Router.Navigation
	  ],

	  componentDidMount:function() {
	    let $__0=    this.props,candidates=$__0.candidates
	    updateSelectedCandidate(candidates[0]);
	  },

	  componentWillUpdate:function(nextProps, nextState) {
	    if (this.state.activeYear != nextState.activeYear) {
	      let href;
	      if (nextState.activeYear == "2016") {
	        href = '/current';
	      } else {
	        href = this.makeHref('prior', {year: nextState.activeYear});
	      }
	      this.transitionTo(href)
	    }
	  },

	  render: function () {
	    let $__0=    this.props,candidates=$__0.candidates
	    , $__1=     this.state,activeCandidate=$__1.activeCandidate,activeYear=$__1.activeYear
	    return (
	      React.createElement("div", null, 
	        React.createElement(RouteHandler, React.__spread({},  this.props, {activeCandidate: activeCandidate, activeYear: activeYear})), 
	        React.createElement(YearSelect, {activeYear: activeYear}), 
	        React.createElement(Share, null)
	      )
	    );
	  }
	});

	module.exports = App;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(6), __webpack_require__(10)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("reflux");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Reflux) {/** @jsx React.DOM */'use strict';

	/*
	 * Reflux aciton
	 * https://github.com/spoike/refluxjs
	 *
	 * Each action is like an event channel for one specific event. Actions are called by components.
	 * The store is listening to all actions, and the components in turn are listening to the store.
	 * Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update
	 */

	module.exports = Reflux.createActions([
	  'updateSelectedCandidate',
	  'updateSelectedYear'
	]);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Reflux) {/** @jsx React.DOM */'use strict';

	let howManyTablets = __webpack_require__(14);
	let formatDollarAmount = __webpack_require__(15);

	let CandidateStore = Reflux.createStore({
	  listenables: [__webpack_require__(12)],

	  init: function() {
	  },

	  getInitialState: function() {
	    this.candidate = {
	      id : 0,
	      tablets: 0
	     };
	    return this.candidate;
	  },

	  onUpdateSelectedCandidate:function (model) {
	    this.candidate = model;
	    this.candidate.tablets = formatDollarAmount(howManyTablets(this.candidate.officialRaised));
	    this.trigger(this.candidate);
	  },

	});

	module.exports = CandidateStore;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	function howManyTablets(amount) {
	  return Math.floor(amount / 279.00);
	}

	module.exports = howManyTablets;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';

	module.exports = function formatDollarAmount(amount) {
	  var arr = _.takeWhile(String(amount).split(''), function (n) {
	    return n !== '.';
	  });
	  return arr.reduce(function (previous, current, index) {
	    if (arr.slice(index).length % 3 === 0) {
	      return previous + ',' + current;
	    } else {
	      return previous + current;
	    }
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, Reflux) {/** @jsx React.DOM */'use strict';

	let $__0=    __webpack_require__(12),updateSelectedYear=$__0.updateSelectedYear;

	let YearSelect = React.createClass({displayName: "YearSelect",

	  mixins: [Reflux.connect(__webpack_require__(18), 'activeYear')],

	  handleChange:function (e) {
	    let updateYear = e.target.value;
	    if (updateYear) {
	      updateSelectedYear(updateYear);
	    }
	  },

	  render:function() {
	    let $__0=      this.props,candidates=$__0.candidates,activeCandidate=$__0.activeCandidate,activeYear=$__0.activeYear;
	    let years = [2016, 2012, 2008, 2004, 2000]

	    return (
	      React.createElement("div", {className: "year-select-container"}, 
	        React.createElement("h3", {className: "year-select-label"}, "Choose Campaign Year"), 
	        React.createElement("select", {className: "year-select", value: activeYear, ref: "yearSelect", onChange: this.handleChange}, 
	          years.map(function(year)  {return React.createElement("option", {key: year, value: year}, year);})
	        )
	      )
	    );
	  }
	});

	module.exports = YearSelect;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(10)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Reflux) {/** @jsx React.DOM */'use strict';

	// this store is for keeping track of which election year should be shown

	let formatDollarAmount = __webpack_require__(15);

	let YearStore = Reflux.createStore({
	  listenables: [__webpack_require__(12)],

	  getInitialState: function() {
	    this.year = 2016;
	    return this.year;
	  },

	  onUpdateSelectedYear:function (value) {
	    this.activeYear = value;
	    this.trigger(this.activeYear);
	  },

	});

	module.exports = YearStore;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {/** @jsx React.DOM */'use strict';

	let Amount = React.createClass({displayName: "Amount",
	  render:function() {
	    let $__0=    this.props,activeCandidate=$__0.activeCandidate
	      , raisedString = activeCandidate && activeCandidate.raisedString || '';

	      let headerClass;
	      if (activeCandidate.party === 'R') headerClass = 'gop'
	      if (activeCandidate.party === 'D') headerClass = 'dem'

	    return (
	      React.createElement("div", null, 
	        React.createElement("h3", null, React.createElement("span", {className: headerClass}, activeCandidate.familiarName), React.createElement("span", null, " has raised:")), 
	        React.createElement("hr", null), 
	        React.createElement("h1", null, ("$" + raisedString)), 
	        React.createElement("hr", null)
	      )
	    );
	  }
	});

	module.exports = Amount;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {/** @jsx React.DOM */'use strict';

	let Share = React.createClass({displayName: "Share",
	  render: function () {
	    return (
	      React.createElement("div", {className: "share-container"}, 
	        React.createElement("ul", {className: "share-icons"}, 
	          React.createElement("li", null, 
	            React.createElement("a", {className: "twitter-link", href: ("https://twitter.com/share?\n                url=" + 
	window.encodeURI(window.location.href) + "\n                &via=r4d1n"
	), 
	                target: "_blank"}, 
	                React.createElement("i", {className: "fa fa-twitter fa-2x"})
	              )
	            ), 
	            React.createElement("li", null, 
	              React.createElement("a", {className: "facebook-link", href: ("https://www.facebook.com/sharer/sharer.php?\n                  &u=" + 
	window.encodeURI(window.location.href)), 
	                  target: "_blank", title: "Share on Facebook"}, 
	                  React.createElement("i", {className: "fa fa-facebook fa-2x"})
	                )
	              )
	            )
	          )
	        );
	      }
	    });

	    module.exports = Share;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {/** @jsx React.DOM */'use strict';

	// child components
	let CurrentChart = __webpack_require__(22)
	, NameSelect = __webpack_require__(29)
	, Amount = __webpack_require__(19)

	let CurrentCampaign = React.createClass({displayName: "CurrentCampaign",

	  componentDidMount:function() {

	  },

	  componentWillReceiveProps:function(nextProps) {

	  },

	  render: function () {
	    let $__0=     this.props,candidates=$__0.candidates,activeCandidate=$__0.activeCandidate
	    return (
	      React.createElement("div", null, 
	        React.createElement("section", null, 
	          React.createElement("div", {className: "big-num-bar"}, 
	            React.createElement(Amount, {activeCandidate: activeCandidate})
	          )
	        ), 
	        React.createElement("section", null, 
	          React.createElement(CurrentChart, React.__spread({},  this.props, {activeCandidate: activeCandidate})), 
	          React.createElement("div", {className: "tap-to-change"}, 
	            React.createElement("h3", null, "Tap Bars to Select Candidates")
	          )
	        )
	      )
	    );
	  }

	});

	module.exports = CurrentCampaign;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, _) {/** @jsx React.DOM */'use strict';

	let $__0=    __webpack_require__(12),updateSelectedCandidate=$__0.updateSelectedCandidate;
	let CandidateStore = __webpack_require__(13);


	let viz = __webpack_require__(23);

	let CurrentChart = React.createClass({displayName: "CurrentChart",

	  selectCandidate:function(e) {
	    // update active candidate by tapping on a bar in the d3 chart
	    let $__0=    this.props,candidates=$__0.candidates;
	    let selected = _.find(candidates, function(item)  {return item.id === e.target.dataset.id;} )
	    if (selected) {
	      updateSelectedCandidate(selected);
	    }
	  },

	  componentDidMount:function() {
	    viz.initCurrent(this.props.candidates);
	    viz.highlight(this.props.activeCandidate);
	  },

	  componentDidUpdate:function() {
	    viz.highlight(this.props.activeCandidate);
	  },

	  componentWillReceiveProps:function(nextProps) {

	  },

	  render: function () {
	    return (
	      React.createElement("div", {onClick: this.selectCandidate, id: "bar-chart-target"})
	    );
	  }
	});

	module.exports = CurrentChart;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(16)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function initCurrent(data) {
	  __webpack_require__(24)(data);
	}

	function initPrior(data) {
	  __webpack_require__(27)(data);
	}

	module.exports = {
	  initCurrent: initCurrent,
	  initPrior: initPrior,
	  highlight: __webpack_require__(28)
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d3 = __webpack_require__(25);

	var _require = __webpack_require__(26);

	var height = _require.height;
	var width = _require.width;
	var margin = _require.margin;
	var colors = _require.colors;

	function draw(data) {
	  var svg = d3.select('#bar-chart-target').append('svg').attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

	  var y = d3.scale.linear().range([height, 0]);

	  x.domain(data.map(function (d) {
	    return d.name;
	  }));
	  y.domain([0, d3.max(data, function (d) {
	    return d.totalReceipts;
	  })]);

	  var bars = svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("data-id", function (d) {
	    return d.id;
	  }) // for click events
	  .attr("x", function (d) {
	    return x(d.name);
	  }).attr("width", x.rangeBand()).attr("height", 0).attr("y", height) // height here is the whole chart
	  .transition().delay(function (d, i) {
	    return i * 150;
	  }).attr("y", function (d) {
	    return y(d.totalReceipts);
	  }).attr("height", function (d) {
	    return height - y(d.totalReceipts);
	  });

	  // TODO: labels!!
	}

	module.exports = draw;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("d3");

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	var margin = { top: 20, right: 10, bottom: 20, left: 10 };
	var width = 300 - margin.left - margin.right;
	var height = 250 - margin.top - margin.bottom;

	var colors = ['#FFA21A', '#E82070', '#2F31FF', '#20E8A8', '#E3FF28'];

	module.exports = {
	  margin: margin,
	  width: width,
	  height: height,
	  colors: colors
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d3 = __webpack_require__(25);

	var _require = __webpack_require__(26);

	var height = _require.height;
	var width = _require.width;
	var margin = _require.margin;
	var colors = _require.colors;

	function draw(data) {

	  // data.forEach((element) => {
	  //   element.receipts = Number(element.receipts);
	  // })

	  console.log(data);

	  var svg = d3.select('#bar-chart-target').append('svg').attr("id", "prior-chart-svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

	  var y = d3.scale.linear().range([height, 0]);

	  x.domain(data.map(function (d) {
	    return d.name;
	  }));
	  y.domain([0, d3.max(data, function (d) {
	    return d.receipts;
	  })]);

	  var bars = svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar selected").attr("x", function (d) {
	    return x(d.name);
	  }).attr("width", x.rangeBand()).attr("height", 0).attr("y", height) // height here is the whole chart
	  .transition().delay(function (d, i) {
	    return i * 300;
	  }).attr("y", function (d) {
	    return y(d.receipts);
	  }).attr("height", function (d) {
	    return height - y(d.receipts);
	  }).attr("class", function (d) {
	    return d.party === "R" ? 'gop bar selected' : 'dem bar selected';
	  });

	  // TODO: labels!!
	}

	module.exports = draw;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d3 = __webpack_require__(25);

	var highlight = function highlight(activeCandidate) {
	  if (activeCandidate) {
	    var bars = d3.selectAll('.bar').classed('inactive', true).classed('selected', false);

	    var active = d3.selectAll('.bar').filter(function (d, i) {
	      return d.id === activeCandidate.id;
	    });

	    var activePartyClass = undefined;
	    activeCandidate.party === 'R' ? activePartyClass = 'gop' : activePartyClass = 'dem';

	    active.classed('inactive', false).classed('selected', true).classed(activePartyClass, true);
	  }
	};

	module.exports = highlight;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, Reflux, _) {/** @jsx React.DOM */'use strict';

	let $__0=    __webpack_require__(12),updateSelectedCandidate=$__0.updateSelectedCandidate;

	let NameSelect = React.createClass({displayName: "NameSelect",

	  mixins: Reflux.connect(__webpack_require__(13), 'selected'),

	  handleChange:function (e) {
	    let $__0=    this.props,candidates=$__0.candidates;
	    let selected = _.find(candidates, function(item)  {return item.id === e.target.value;} )
	    if (selected) {
	      updateSelectedCandidate(selected);
	    }
	  },

	  render:function() {
	    let $__0=     this.props,candidates=$__0.candidates,activeCandidate=$__0.activeCandidate;
	    let selectClass;
	    if (activeCandidate.party === 'R') selectClass = 'gop'
	    if (activeCandidate.party === 'D') selectClass = 'dem'
	    return (
	      React.createElement("h3", null, 
	        React.createElement("select", {value: activeCandidate.id, className: selectClass, ref: "nameSelect", onChange: this.handleChange}, 
	          candidates.map(function(cand)  {return React.createElement("option", {key: cand.fecId, value: cand.id}, cand.firstName);})
	        ), 
	        "Has Raised:"
	      )
	    );
	  }
	});

	module.exports = NameSelect;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(10), __webpack_require__(16)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {/** @jsx React.DOM */'use strict';

	// child components
	let NameSelect = __webpack_require__(29)
	, Amount = __webpack_require__(19)
	, PriorChart = __webpack_require__(31)

	let PriorCampaign = React.createClass({displayName: "PriorCampaign",

	  componentWillUpdate:function() {
	  },

	  render:function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("section", null, 
	          React.createElement("div", {className: "big-num-bar"}

	          )
	        ), 
	        React.createElement(PriorChart, React.__spread({},  this.props))
	      )
	    );
	  }

	});

	module.exports = PriorCampaign;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {/** @jsx React.DOM */'use strict';

	let $__0=    __webpack_require__(12),updateSelectedCandidate=$__0.updateSelectedCandidate;
	let CandidateStore = __webpack_require__(13);


	let viz = __webpack_require__(23);

	let PriorChart = React.createClass({displayName: "PriorChart",

	  renderChart:function() {
	    let $__0=     this.props,prior=$__0.prior,activeYear=$__0.activeYear;
	    let candidates = prior[activeYear];
	    console.log(prior, activeYear, candidates)
	    viz.initPrior(candidates);
	  },

	  componentDidMount:function() {
	    this.renderChart();
	  },

	  componentDidUpdate:function() {
	    // this.forceUpdate()
	    let target = document.getElementById('bar-chart-target');
	    let svg = document.getElementById('prior-chart-svg');
	    target.removeChild(svg);
	    this.renderChart();
	  },

	  render: function () {
	    return (
	      React.createElement("div", {id: "bar-chart-target"})
	    );
	  }
	});

	module.exports = PriorChart;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("node-env-file");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(2);
	var controller = __webpack_require__(35);

	var router = express.Router();

	// all routes prefixed with /api/records/

	/* GET JSON */
	router.get('/', controller.allRecords); // needs query string
	router.get('/latest', controller.latestRecords);
	// router.get('/leaders', controller.leaders)

	module.exports = router;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let Record = __webpack_require__(36);
	let Timestamp = __webpack_require__(37);

	let candidates = __webpack_require__(38)

	let controller = {};

	let priorYears = __webpack_require__(39);

	// functions for answering JSON requests

	// get all projects within the relevant time frame
	controller.allRecords = function(req, res, next) {
	  let opts = {};
	  if (req.query.name) {
	    opts.name = new RegExp(req.query.name, "i");
	  }
	  Record
	  .find(opts)
	  .sort({ requestedAt : 1 })
	  .exec(function (err,doc) {
	    if (err) {
	      res.status(500).json({status:'error', message: err});
	    } else {
	      res.json(doc);
	    }
	  });
	}

	controller.latestRecords = function(req, res, next) {
	  let limit = 5; // limits number of candidates, not timestamps
	  if (req.query.limit) {
	    limit = req.query.limit;
	  }
	  Timestamp
	  .find()
	  .sort({requestedAt : -1})
	  .limit(1)
	  .exec()
	  .then(function (timestamp) {
	    return Record
	    .find()
	    .where('requestedAt')
	    .equals(timestamp[0].requestedAt)
	    .sort({ officialRaised : -1 })
	    .limit(limit)
	    .exec()
	    .then(function (result) {
	      let response = {
	        current: result,
	        prior: priorYears
	      }
	      res.json(response);
	    })
	    .catch(function (err) {
	      res.status(500).json({status:'error', message: err});
	    })
	  })
	}

	module.exports = controller;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(33);

	var Schema = mongoose.Schema;

	var RecordSchema = new Schema({
		name: String,
		party: String,
		fecId: String,
		totalReceipts: Number,
		officialRaised: Number,
		officialSpent: Number,
		independentTotal: Number,
		independentFor: Number,
		independentAgainst: Number,
		cashOnHand: Number,
		cashDate: String,
	  requestedAt: Date
	});

	module.exports = mongoose.model('Record', RecordSchema);


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(33);

	var Schema = mongoose.Schema;

	var TimestampSchema = new Schema({
	  requestedAt: Date
	});

	module.exports = mongoose.model('Timestamp', TimestampSchema);


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {
		"D": [
			{
				"name_last": "Chafee",
				"name_first": "Lincoln",
				"fec_id": "P60008075"
			},
			{
				"name_last": "Clinton",
				"name_first": "Hillary",
				"fec_id": "P00003392"
			},
			{
				"name_last": "O'Malley",
				"name_first": "Martin",
				"fec_id": "P60007671"
			},
			{
				"name_last": "Sanders",
				"name_first": "Bernie",
				"fec_id": "P60007168"
			},
			{
				"name_last": "Webb",
				"name_first": "Jim",
				"fec_id": "P60008885"
			}
		],
		"R": [
			{
				"name_last": "Bush",
				"name_first": "Jeb",
				"fec_id": "P60008059"
			},
			{
				"name_last": "Carson",
				"name_first": "Ben",
				"fec_id": "P60005915"
			},
			{
				"name_last": "Christie",
				"name_first": "Chris",
				"fec_id": "P60008521"
			},
			{
				"name_last": "Cruz",
				"name_first": "Ted",
				"fec_id": "P60006111"
			},
			{
				"name_last": "Fiorina",
				"name_first": "Carly",
				"fec_id": "P60007242"
			},
			{
				"name_last": "Graham",
				"name_first": "Lindsey",
				"fec_id": "P60007697"
			},
			{
				"name_last": "Huckabee",
				"name_first": "Mike",
				"fec_id": "P80003478"
			},
			{
				"name_last": "Jindal",
				"name_first": "Bobby",
				"fec_id": "P60008398"
			},
			{
				"name_last": "Pataki",
				"name_first": "George",
				"fec_id": "P60007572"
			},
			{
				"name_last": "Paul",
				"name_first": "Rand",
				"fec_id": "P40003576"
			},
			{
				"name_last": "Perry",
				"name_first": "Rick",
				"fec_id": "P20003281"
			},
			{
				"name_last": "Rubio",
				"name_first": "Marco",
				"fec_id": "P60006723"
			},
			{
				"name_last": "Santorum",
				"name_first": "Rick",
				"fec_id": "P20002721"
			},
			{
				"name_last": "Trump",
				"name_first": "Donald",
				"fec_id": "P80001571"
			}
		]
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = {
		"2000": [
			{
				"name": "George Bush",
				"receipts": "169074844",
				"party": "R"
			},
			{
				"name": "Al Gore",
				"receipts": "126119388",
				"party": "D"
			}
		],
		"2004": [
			{
				"name": "George Bush",
				"receipts": "351943832",
				"party": "R"
			},
			{
				"name": "John Kerry",
				"receipts": "314616929",
				"party": "D"
			}
		],
		"2008": [
			{
				"name": "John McCain",
				"receipts": "218624822",
				"party": "R"
			},
			{
				"name": "Barack Obama",
				"receipts": "605130483",
				"party": "D"
			}
		],
		"2012": [
			{
				"name": "Mitt Romney",
				"receipts": "339823848",
				"party": "R"
			},
			{
				"name": "Barack Obama",
				"receipts": "555972681",
				"party": "D"
			}
		]
	}

/***/ }
/******/ ]);
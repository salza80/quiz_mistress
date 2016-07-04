"use strict";
const Quiz = require('./components/quiz');
const React = require("react");
const ReactDOM = require("react-dom");
const $ = require("jquery");
const Reflux = require("reflux");

ReactDOM.render( React.createElement(Quiz,null), document.getElementById('renderer'));


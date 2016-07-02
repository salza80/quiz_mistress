"use strict";
const SearchPage = require('./components/searchPage');
const React = require("react");
const ReactDOM = require("react-dom");
const $ = require("jquery");
const Reflux = require("reflux");

ReactDOM.render( React.createElement(SearchPage,null), document.getElementById('renderer'));


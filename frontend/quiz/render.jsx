"use strict";
const Quiz = require('./components/quiz');
const React = require("react");
const ReactDOM = require("react-dom");
const $ = require("jquery");
const Reflux = require("reflux");


var pEle = $('#renderer')
var props = null

if (pEle.data('props') != undefined){
  props = pEle.data('props')
}

ReactDOM.render( Quiz(props), document.getElementById('renderer'));

 

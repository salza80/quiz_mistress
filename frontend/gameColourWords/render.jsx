"use strict";
const Game = require('./components/game');
const React = require("react");
const ReactDOM = require("react-dom");
const $ = require("jquery");
const Reflux = require("reflux");


var pEle = $('#renderer')
var props = null

if (pEle.data('props') != undefined){
  props = pEle.data('props')
}

ReactDOM.render( Game(), document.getElementById('renderer'));

 

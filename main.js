require('babel-polyfill');
var React = require('react');
var ReactDOM = require('react-dom');
var MainDashBoard = require("./ui/mainDashBoard.js");

ReactDOM.render(
    <MainDashBoard/>,
    document.getElementById('content')
);
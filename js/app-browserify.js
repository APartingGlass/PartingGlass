"use strict";
require("es5-shim")
require("babel/register")
var Promise = require('es6-promise').Promise
import React from 'react'
import Backbone from 'backbone'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import * as Comp from './components/comps'

Parse.initialize("hFTYt5zZR2erwzvgvK2CTn6boEn3wXPTwQryJRTg", "HQhZqHrGATYYNw1YRa9mqDzjKH9WVa29L6uLmzqX");

React.render(<Comp.Login/>, document.querySelector('.container'))
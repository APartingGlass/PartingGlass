"use strict";
require("es5-shim")
require("babel/register")
var Promise = require('es6-promise').Promise
import $ from 'jquery'
import React from 'react'
import Backbone from 'backbone'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import * as Comp from './components/comps'

Parse.initialize("hFTYt5zZR2erwzvgvK2CTn6boEn3wXPTwQryJRTg", "HQhZqHrGATYYNw1YRa9mqDzjKH9WVa29L6uLmzqX");

var AppRouter = Parse.Router.extend({
	initialize: function() {
		Parse.history.start()
		window.location.hash = 'home'
	},
    routes: {
        'login': 'login',
        'home': 'home',
        'profile': 'profile'
    },
    loading: function() {
    	React.render( <CircularProgress mode="indeterminate" size={2} />, document.querySelector('.container'))
    },
    login: function() {
        if (Parse.User.current()) {
            window.location.hash = 'home'
        } else {
        	React.render( <Comp.Login /> , document.querySelector('.container'))
        }
    },
    home: function() {
    	if (Parse.User.current()) {
    		React.render( <Comp.Home />, document.querySelector('.container'))
    	} else {
    		window.location.hash = 'login'
    	}
    }
})

var pGlass = new AppRouter()
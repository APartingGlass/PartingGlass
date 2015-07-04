"use strict";
require("es5-shim")
require("babel/register")
var Promise = require('es6-promise').Promise
import $ from 'jquery'
import React from 'react'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import * as Comp from './components/comps'

///initialize Parse
Parse.$ = $
Parse.initialize("hFTYt5zZR2erwzvgvK2CTn6boEn3wXPTwQryJRTg", "HQhZqHrGATYYNw1YRa9mqDzjKH9WVa29L6uLmzqX");

var AppRouter = Parse.Router.extend({
	initialize: function() {
		Parse.history.start()
        this.loggedIn = false
        window.location.hash = 'home'
	},
    routes: {
        'login': 'login',
        'home': 'home',
        'profile': 'profile',
        'taste': 'taste'
    },
    ///loading spinner
    loading: function() {
    	React.render( <CircularProgress mode="indeterminate" size={2} />, document.querySelector('.container'))
    },
    ///login screen
    login: function() {
        if (!Parse.User.current()) {
    	React.render( <Comp.Login /> , document.querySelector('.container'))
    } else {window.location.hash ='home'}
    },
    ///home screen with different options
    home: function() {
        if(Parse.User.current()) {
            React.render( <Comp.Home />, document.querySelector('.container'))
        } else {window.location.hash = 'login'}
    },
    ///tasting screen with landing and stages
    taste: function() {
		if(Parse.User.current()) {
            React.render( <Comp.TasteLanding />, document.querySelector('.container'))
        } else {window.location.hash = 'login'} }
    })

var pGlass = new AppRouter()
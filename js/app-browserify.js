"use strict";
require("es5-shim")
require("babel/register")
var Promise = require('es6-promise').Promise
import $ from 'jquery'
import React from 'react'
import * as Comp from './components/comps'
import * as T from './components/taste'

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
        'taste': 'taste',
        'register': 'register',
        'taste/white': 'white',
        'taste/red': 'red',
        'log': 'log'
    },
    ///login screen
    login: function() {
        if (!Parse.User.current()) {
        React.render(<span/>, document.querySelector('.nav'))
    	React.render( <Comp.Login /> , document.querySelector('.container'))
    } else {window.location.hash ='home'}
    },
    ///home screen with different options
    home: function() {
        if(Parse.User.current()) {
            React.render( <Comp.NavBar />, document.querySelector('.nav'))
            React.render( <Comp.Home />, document.querySelector('.container'))
        } else {window.location.hash = 'login'}
    },
    ///tasting screen with landing and stages
    taste: function() {
		if(Parse.User.current()) {
            React.render( <Comp.TasteLanding />, document.querySelector('.container'))
        } else {window.location.hash = 'login'} },
    register: function () {
        React.render(<Comp.Register />, document.querySelector('.container'))
    },
    white: function () {
        React.render(<T.WhiteTaste />, document.querySelector('.container'))
    },
    red: function() {
        React.render(<T.RedTaste/>, document.querySelector('.container'))
    },
    log: function() {
        React.render(<Comp.Loading/>, document.querySelector('.container'))
        Parse.Cloud.run('userWines', {}, {
            success: function (result) {
                React.render(<Comp.Log wines={result} />, document.querySelector('.container'))
            },
            error: function (error) {
                alert(error)
            }
        })
    }
    })

var pGlass = new AppRouter()
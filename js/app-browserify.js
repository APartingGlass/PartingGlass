"use strict";
require("es5-shim")
require("babel/register")
var Promise = require('es6-promise').Promise
import $ from 'jquery'
import React from 'react'
import * as Comp from './components/comps'
import * as T from './components/taste'
import * as Cards from './components/cards'
import * as Img from './components/images'
React.initializeTouchEvents(true)

window.$ = $
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
        'register': 'register',
        'log': 'log',
        'decks': 'decks'
    },
    login: function() {
        if (!Parse.User.current()) {
        React.render(<span/>, document.querySelector('.nav'))
    	React.render( <Comp.Login /> , document.querySelector('.container'))
    } else {window.location.hash ='home'}
    },
    home: function() {
        if(Parse.User.current()) {
            React.render( <Comp.NavBar />, document.querySelector('.nav'))
            React.render( <Comp.Home />, document.querySelector('.container'))
        } else {window.location.hash = 'login'}
    },
    register: function () {
        React.render(<Comp.Register />, document.querySelector('.container'))
    },
    log: function() {
        React.render(<Img.Loader/>, document.querySelector('.container'))
        Parse.Cloud.run('userWines', {}, {
            success: function (result) {
                React.render(<Comp.Log wines={result} />, document.querySelector('.container'))
            },
            error: function (error) {
                swal({   title: "Error!",   text: error.message,   type: "error",   confirmButtonText: 'Return'});
            }
        })
    },
    decks: function() {
        React.render(<Cards.DecksView type='Decks'/>, document.querySelector('.container'))
    }
    })

var pGlass = new AppRouter()
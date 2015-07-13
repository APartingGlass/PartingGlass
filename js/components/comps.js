import * as M from '../MUI'
import React from 'react'
import * as T from './taste'
import _ from 'underscore'
import $ from 'jquery'

var Taster = Parse.User.extend({
	defaults: {
		username: '',
		password: '',
		email: ''
	},
	validate: function () {
		var req = ['username', 'email', 'password']
		return req.reduce((a, v, i) => {
			if (!this.attributes[v]) 
				{a = false} 
			return a
		}, true)
	}
})

export class Login extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
	}
	login(e) {
		e.preventDefault()
		Parse.User.logIn(this.state.username, this.state.password, {
			success: (...args) => {
				window.location.hash = 'home'
			},
			error: function(user, error) {
				alert('We were unable to verify your email and password')
			}
		})
	}
	render() {
		return (<div>
				<form className>
					<input placeholder='username' value={this.state.username} onChange={(e) => this.setState({username: e.target.value, email:e.target.value})}/>
					<input placeholder='password' type='password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
					<div onClick={(e) => this.login(e)}>login</div> 
					<div onClick={(e) => window.location.hash = 'register'} >Register</div>
				</form>
			</div>)
	}
}

export class Register extends React.Component {
	constructor(props) {
		super(props)
		this.user = new Taster()
		this.state = {
			username:'',
			pass1: '',
			pass2: '',
			email: '',
			org: '',
			passesMatch: true
		}
	}
	_handleChange(name) {
		this.setState({[name]: React.findDOMNode(this.refs[name]).value })
	}
	_confirmPass() {
		console.log(this.state)
		if (this.state.pass1 !== this.state.pass2) {
			this.setState({passesMatch: false})
		} else {this.setState({passesMatch: true})}
	}
	_signUp() {
		if (this.state.passesMatch === false) {
			alert('passwords do not match')
			return
		}
		var pass = this.state.pass1,
			username = this.state.username,
			email = this.state.email,
			org = this.state.org
		this.user.set({
			username: username,
			password: pass,
			email: email,
			organization: org
		})
		this.user.signUp(null, {
			success: () => {
				alert('please check your email for confirmation')
				window.location.hash ='login'
			},
			error: (user, error) => {
				alert(error)
			}
		})
	}
	render() {
		var match = this.state.passesMatch ? <span/> : <h6>passwords do not match</h6>
		return (<div>
					<input onChange={(e) =>this._handleChange('username')} ref="username" value={this.state.username} placeholder='username' />
					{match}
					<input onChange={(e) => this._handleChange('pass1')} ref="pass1" type='password' value={this.state.pass1} placeholder='password' />
					<input onBlur={() => this._confirmPass()} onChange={(e) => this._handleChange('pass2')} ref="pass2" type='password' value={this.state.pass2} placeholder='confirm password' />					
					<input type='email' onChange={(e) => this._handleChange('email')} ref="email" value={this.state.email} placeholder='email' />
					<input onChange={(e) => this._handleChange('org')} ref="org" value={this.state.org} placeholder='organization' />
					<div onClick={() => this._signUp()}>submit</div>
				</div>)
	}
}

export class Home extends M.UI {
	constructor(props) {
		super(props)
		this.state = {timer: 6}
	}
	showTime() {
		var time = (this.state.timer%1 ===0) ? (Math.floor(this.state.timer) +':00') : (Math.floor(this.state.timer) +':30')
		if (time === '10:30') {return 'untimed'} else {return time}
	}
	render() {
		return(<M.ui.Card>
          <M.ui.CardTitle title="Taste" subtitle="Run through a single wine, timed or untimed"/>
          <M.ui.CardActions>
            <M.ui.FlatButton onClick={() => window.location.hash = 'taste'} label="GO" /><M.ui.FlatButton label={this.showTime()}/>
            <M.ui.Slider className="timeSlider" name="Time" onChange={(e, val) => this.setState({timer:val})} min={4} defaultValue={6} step={0.5} max={10.5}/>
          </M.ui.CardActions>
          <M.ui.CardText>
          	Blind-tasting is one of the most challenging tasks any individual can engage themselves in.
          	Here, you'll find a stage to practice. 
          </M.ui.CardText>
        </M.ui.Card>)
	}
}

export class TasteLanding extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			wine: null
		}
	}
	render() {
		var wineView = <span/>
		if (this.state.wine === 'white') {
			wineView = <T.WhiteTaste  />
		} else if (this.state.wine === 'red') {
			wineView = <T.RedTaste/>
		}
		return (<div className='card'>
		<div className='wineSelection red' onClick={() => this.setState({wine: 'red'})}>Red</div>
		<div className='wineSelection white' onClick={() => this.setState({wine: 'white'})}>White</div>
		{wineView}
		</div>)
	}
}

export class NavBar extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			drop: false
		}
		var user = Parse.User.current()
		this.state.user = user
	}
	logOut() {
		Parse.User.logOut()
		window.location.hash = 'login'
	}
	toggle() {
		this.setState({
			drop: !this.state.drop
		})
	}
	render() {
		var username = this.state.user.attributes.username					
		var menu = this.state.drop ? <div className='signOut' onClick={() => this.logOut()}>Sign Out</div> : <span/>
		return (<div className='bar'>
					<div className='logo' onClick={() => window.location.hash = 'home'}>PartingGlass</div>
					<div className='profile' onClick={() => this.toggle()}>
						{username}
						<div className='menu'>{menu}</div>
					</div>
				</div>)
	}
}
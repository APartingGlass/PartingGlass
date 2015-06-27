import * as M from '../MUI'
import React from 'react'

export class Login extends M.UI {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	login(e) {
		e.preventDefault()
		this.setState({
			username: React.findDOMNode('email').value,
			password: React.findDOMNode('password').value
		});
		console.log(this.state)
		Parse.User.logIn(this.state.username, this.state.password, {
			success: (...args) => console.log(args),
			error: function(user, error) {
				console.log(error)
			}
		})
	}
	register() {
		console.log()
		this.setState({
		username: React.findDOMNode('email').value,
		password: React.findDOMNode('password').value
		})
		var user = new Parse.User({
			username: this.state.username,
			email: this.state.username,
			password: this.state.password
		})
		user.signUp()
	}
	render() {
		return (<div>
				<form>
					<M.ui.TextField hintText="username" type='email' ref='email'/>
					<M.ui.TextField hintText='password' type='password' ref='password'/>
					<M.ui.RaisedButton onClick={(e) => this.login(e)} label='Login' primary={true}/> 
					<M.ui.RaisedButton onClick={(e) => this.register(e)}  label='Register' primary={false}/>
				</form>
			</div>)
	}
}

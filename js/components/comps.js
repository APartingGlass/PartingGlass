import * as M from '../MUI'
import React from 'react'

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
			success: (...args) => {},
			error: function(user, error) {
				alert(error)
			}
		})
	}
	register(e) {
		e.preventDefault()
		var user = new Parse.User({
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		})
		user.signUp(null, {
  			success: function(user) {  },
  			error: function(user, error) {
			    alert("Error: " + error.code + " " + error.message);
			    }
	})
	}
	render() {
		return (<div>
				<form>
					<M.ui.TextField  hintText="username" type='email' value={this.state.username} onChange={(e) => this.setState({username: e.target.value, email:e.target.value})}/>
					<M.ui.TextField hintText='password' type='password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
					<M.ui.RaisedButton onClick={(e) => this.login(e)} label='Login' primary={true}/> 
					<M.ui.RaisedButton onClick={(e) => this.register(e)}  label='Register' primary={false}/>
				</form>
			</div>)
	}
}

export class Home extends M.UI {
	constructor(props) {
		super(props)
	}
	render() {
		return(<div>
			<RaisedButton href="https://github.com/callemall/material-ui" secondary={true} label="Taste"/>
 			<RaisedButton href="https://github.com/callemall/material-ui" secondary={true} label="Wine Log"/>
 			<RaisedButton href="https://github.com/callemall/material-ui" secondary={true} label="Study"/>
		</div>)
	}
}

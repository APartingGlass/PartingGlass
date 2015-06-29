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
		this.state = {timer: 6}
	}
	showTime() {
		var time = (this.state.timer%1 ===0) ? (Math.floor(this.state.timer) +':00') : (Math.floor(this.state.timer) +':30')
		console.log(time)
		if (time === '10:30') {return 'untimed'} else {return time}
	}
	render() {
		return(<M.ui.Card>
          <M.ui.CardTitle title="Taste" subtitle="Run through a single wine, timed or untimed"/>
          <M.ui.CardActions>
            <M.ui.FlatButton label="GO" /><M.ui.FlatButton label={this.showTime()}/>
            <M.ui.Slider className="timeSlider" name="Time" onChange={(e, val) => this.setState({timer:val})} min={4} defaultValue={6} step={0.5} max={10.5}/>
          </M.ui.CardActions>
          <M.ui.CardText>
          	Blind-tasting is one of the most challenging tasks any individual can engage themselves in.
          	Here, you'll find a stage to practice. 
          </M.ui.CardText>
        </M.ui.Card>)
	}
}

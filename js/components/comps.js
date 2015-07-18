import * as M from '../MUI'
import React from 'react'
import * as T from './taste'
import _ from 'underscore'
import $ from 'jquery'
import * as Img from './images'


var Taster = Parse.User.extend({
	defaults: {
		username: '',
		password: '',
		email: '',
		showHelp: true
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

export class Loading extends M.UI {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<M.ui.CircularProgress className="loader text" style={{position: 'absolute', top: '50%', left: '50%', 'transform': 'translate(-250%, -250%)'}} mode="indeterminate" size={4} />)
	}
}

export class Login extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
	}
	login(e) {
		console.log(this.state.username, this.state.password)
		e.preventDefault()
		Parse.User.logIn(this.state.username, this.state.password, {
			success: (...args) => {
				console.log('success')
				window.location.hash = 'home'
			},
			error: function(user, error) {
				alert('We were unable to verify your email and password')
				console.log(error)
			}
		})
		React.render(<Loading/>, document.querySelector('.container'))
	}
	render() {
		var inputStyle = {
			marginTop: '2rem',
			border: '1px solid white'
		}
		var buttonStyle = {
			flexGrow: '1',
			position: 'relative'
		}
		return (<div className='card'>
					<div style={{flexDirection: 'column', justifyContent: 'space-between', maxWidth: '50%', margin: 'auto', paddingTop: '2rem'}}className='flexcont'>
						<input style ={inputStyle}className="userField" placeholder='username' type='text' value={this.state.username} onChange={(e) => this.setState({username: e.target.value, email:e.target.value})}/>
						<input style ={inputStyle}className="passField" placeholder='password' type='password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
					</div>
					<div style={{display: 'flex', flexDirection: 'row'}}className='flexcont'>
						<div style={buttonStyle} className='button' onClick={(e) => this.login(e)}>
						<div className='text'>login</div>
						</div> 
						<div style={buttonStyle} className='button' onClick={(e) => window.location.hash = 'register'} >
						<div className='text'>Register</div>
						</div>
					</div>
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
				console.log(error, user)
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
	taste() {
		React.render(<TasteLanding time={this.state.timer} />, document.querySelector('.container'))
	}
	render() {
		return(<div className='home'>
			<M.ui.Card style={{marginBottom: '2rem', maxHeight: '40%'}}>
          <M.ui.CardMedia overlay={<M.ui.CardTitle title="Taste" subtitle="Run through a single wine, timed or untimed"/>}>
            <img src="../155.jpg"/>
          </M.ui.CardMedia>
          <M.ui.CardActions>
            <M.ui.FlatButton onClick={() => this.taste()} label="GO" /><M.ui.FlatButton label={this.showTime()}/>
            <M.ui.Slider className="timeSlider" name="Time" onChange={(e, val) => this.setState({timer:val})} min={4} defaultValue={6} step={0.5} max={10.5}/>
          </M.ui.CardActions>
          <M.ui.CardText>
          	Blind-tasting is one of the most challenging tasks any individual can engage themselves in.
          	Here, you'll find a stage to practice. 
          </M.ui.CardText>
        </M.ui.Card>
        <M.ui.Card style={{marginBottom: '2rem'}}>
          <M.ui.CardMedia overlay={<M.ui.CardTitle title="Wine Log" subtitle="Revisit Past Tastings"/>}>
            <img src="../notebook.jpg"/>
          </M.ui.CardMedia>
          <M.ui.CardActions>
            <M.ui.FlatButton onClick={() => window.location.hash = 'log'} label="GO" />
          </M.ui.CardActions>
          <M.ui.CardText>
          	Revisit and study past tasting notess
          </M.ui.CardText>
        </M.ui.Card>
        </div>)
	}
}
export class Log extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			weatherApi: {
			url:'http://www.ncdc.noaa.gov/cdo-web/api/v2/', 
			data:{}, 
			headers:{ token: 'xMyxWDfOEQGzuVPXnVHEoyCdoQcEvcfZ' }
			}
		}
		console.log(props.wines)
	}
	parseProminent(obj) {
		var results = Object.keys(obj).reduce(
			(a, v, i) => {
				if (obj[v] === 3) {
					a.push(v)
				}
				return a
			}
			,[])
		if (results.length > 0) {
			return `Prominently ${results.map((v) => v + ' ')}`
		} else {return ''}
	}
	parseSlight(obj) {
		var results = Object.keys(obj).reduce(
			(a, v, i) => {
				if (obj[v] === 2) {
					a.push(v)
				}
				return a
			}
			,[])
		if (results.length > 0) {
			return `Slightly ${results.join(', ')}`
		} else {return ''}
	}
	render() {
		return (<div className='wineLog'>
			{this.props.wines.map((v) => {
				var acidity = v.attributes.acidity,
					alcohol = v.attributes.alcohol,
					finish = v.attributes.finish,
					conclusions = v.attributes.conclusions,
					fruitFamily = v.attributes.fruitFamily,
					fruitQuality = v.attributes.fruitQuality,
					mineral = v.attributes.mineral,
					sugar = v.attributes.sugar,
					type = v.attributes.type,
					color = v.attributes.color,
					nonFruit = v.attributes.nonFruit
			return (<div className='wine'>
									<div className='createdAt'>
										{`${v.createdAt.getMonth()}/${v.createdAt.getDay()}`}
									</div>
									<div className='about'>
										{`${type} wine from ${conclusions.subregion}, ${conclusions.country}
										Producer: ${conclusions.producer}, Grapes: ${conclusions.grapes}, Vintage: ${conclusions.year}`}
									</div>
									<div className='structure'>
										{`Acidity: ${acidity}, Alcohol: ${alcohol}, Sugar: ${sugar}
										Finish: ${finish}`}
									</div>
									<div className='notes'>
										<div>{`Color: ${color}`}</div>
										<div>{`Fruit Qualities: ${this.parseProminent(fruitQuality)} ${this.parseSlight(fruitQuality)}`}</div>
										<div>{`Fruit Families: ${this.parseProminent(fruitFamily)} ${this.parseSlight(fruitFamily)}`}</div>
										<div>{`Non-Fruit: ${this.parseProminent(nonFruit)} ${this.parseSlight(nonFruit)}`}</div>
										<div>{`Mineral and Oak: ${this.parseProminent(mineral)} ${this.parseSlight(mineral)}`}</div>
									</div>
								</div>)
							}
							)}
					</div>)
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
		return (<div style={{height: '50%', width: '50%', alignItems: 'center'}} className='card text'>
					<div className='wineSelection card' style={{background: 'radial-gradient(ellipse at center, rgba(241,111,92,1) 0%, rgba(246,41,12,1) 0%, rgba(240,47,23,1) 4%, rgba(248,80,50,1) 31%, rgba(211,47,47,1) 100%)'}} onClick={() => window.location.hash ='taste/red'}>
						<div>Red</div>
					</div>
					<div className='wineSelection card' style={{background: 'radial-gradient(ellipse at center, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)'}} onClick={() => window.location.hash ='taste/white'}>
						<div>White</div>
					</div>
				</div>)
	}
}

export class NavBar extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			menuOpen: false,
			classOpacity: 'hard',
		}
		window.addEventListener('scroll', () => {
			if (window.scrollY > 60) {this.soften()}
			else {this.solidify()} 
		})  
	}
	soften() {
		this.setState({classOpacity: 'soft'})
	}
	solidify() {
		this.setState({classOpacity: 'hard'})
	}
	logOut() {
		Parse.User.logOut()
		window.location.hash = 'login'
	}
	scrollTop() {
		$('html, body').animate({scrollTop: 0}, 500)
	}
	goHome() {
		if (window.location.hash ='home') {
			this.scrollTop()
		} else {window.location.hash = 'home'}
	}
	render() {
		return (<M.ui.AppBar className={this.state.classOpacity} style={{background: '#4DD0E1', color: 'red', position: 'fixed', top: '0'}} title="Parting Glass"
  					iconElementLeft={<M.ui.IconButton onClick={() => this.goHome()}><Img.Logo /></M.ui.IconButton>} 
  					iconElementRight={<M.ui.IconButton onClick={() => this.logOut()}><Img.LogOut/></M.ui.IconButton>}>
  					</M.ui.AppBar>)}
}



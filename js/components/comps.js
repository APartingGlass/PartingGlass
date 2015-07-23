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


export class Login extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			transition: 'none',
			valid: true
		}
	}
	invalid() {
		clearTimeout(this.state.timeout)
		this.setState({valid: false})
		this.state.timeout = setTimeout(() => {
			this.setState({valid: true, transition: 'background-color 1s ease'})
			setTimeout(() => {
				this.setState({transition: 'none'})
			}, 1100)
		}, 3000)
	}
 	login(e) {
    if (!!this.state.username && !!this.state.username) {
        Parse.User.logIn(this.state.username, this.state.password, {
            success: (...args) => {
                console.log('success')
                window.location.hash = 'home'
            },
            error: function(user, error) {
                alert('We were unable to verify your email and password')
                React.render(<Login /> , document.querySelector('.container'))
            }
        })
        React.render( <Img.Loader /> , document.querySelector('.container'))
    } else {this.invalid() }
	}
	render() {
		var boxColor = this.state.valid ? '#42c7da': '#e53935',
			transStyle = this.state.transition,
			inputStyle = {textAlign: 'center', color: 'white'}
		return (<div>
					<Img.Logo />
				<h3 className='loginLogo'>Parting Glass</h3>
				<div className='loginCard card' style={{backgroundColor: boxColor, transition: transStyle}}>
					<input style={inputStyle} className="userField" placeholder='username' type='text' value={this.state.username} onChange={(e) => this.setState({username: e.target.value, email:e.target.value})}/>
					<input style={inputStyle} className="passField" placeholder='password' type='password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
					<M.ui.FlatButton onClick={() => this.login()} label='Sign In' />
				</div>
    		    <M.ui.RaisedButton style={{marginTop: '5rem', width: '50%', left: '50%', transform: 'translateX(-50%)', position: 'absolute'}} primary={true} onClick={() => window.location.hash = 'register'} label="Register"/>
	    		    </div>)
	}
}

export class Register extends M.UI {
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
				window.location.hash ='login'
			},
			error: (user, error) => {
				console.log(error, user)
			}
		})
	}
	render() {
			var cardStyle = {padding: '3rem'},
			inputStyle = {textAlign: 'center', color: 'white'},
			match = this.state.passesMatch ? <span/> : <h6 style={{textAlign: 'center', color: 'red'}}>passwords do not match</h6>,
			buttonStyle = {marginTop: '1rem'}
		return (<div style={cardStyle} className='regCard card'>
					<input style={inputStyle} type='text' onChange={(e) =>this._handleChange('username')} ref="username" value={this.state.username} placeholder='username' />
					{match}
					<input style={inputStyle} onChange={(e) => this._handleChange('pass1')} ref="pass1" type='password' value={this.state.pass1} placeholder='password' />
					<input style={inputStyle} onBlur={() => this._confirmPass()} onChange={(e) => this._handleChange('pass2')} ref="pass2" type='password' value={this.state.pass2} placeholder='confirm password' />					
					<input style={inputStyle} type='email' onChange={(e) => this._handleChange('email')} ref="email" value={this.state.email} placeholder='email' />
					<input style={inputStyle} type='text' onChange={(e) => this._handleChange('org')} ref="org" value={this.state.org} placeholder='organization' />
					<M.ui.RaisedButton style={buttonStyle} primary={true} onClick={() => this._signUp()} label='Submit'/>
					<M.ui.RaisedButton style={buttonStyle} secondary={true} onClick={() => window.location.hash = 'login'} label='Back'/>					
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
		window.location.hash = 'taste'
		React.render(<TasteLanding time={this.state.timer}/>, document.querySelector('.container'))
	}
	render() {
		var cardStyle = {marginBottom: '2rem', backgroundColor: '#E0F2F1'}
		return(<div className='home'>
			<M.ui.Card className='homeCard' style={cardStyle}>
          <M.ui.CardMedia overlay={<M.ui.CardTitle title="Taste" subtitle="Run through a single wine, timed or untimed"/>}>
            <img src="../wines.jpg"/>
          </M.ui.CardMedia>
          <M.ui.CardActions>
            <M.ui.RaisedButton onClick={() => this.taste()} label="GO" /><M.ui.FlatButton label={this.showTime()}/>
            <M.ui.Slider className="timeSlider" name="Time" onChange={(e, val) => this.setState({timer:val})} min={4} defaultValue={6} step={0.5} max={10.5}/>
          </M.ui.CardActions>
          <M.ui.CardText>
          	Blind-tasting is one of the most challenging tasks any individual can engage themselves in.
          	Here, you'll find a stage to practice. 
          </M.ui.CardText>
        </M.ui.Card>
        <M.ui.Card className='homeCard'  style={cardStyle}>
          <M.ui.CardMedia overlay={<M.ui.CardTitle title="Wine Log" subtitle="Revisit Past Tastings"/>}>
            <img src="../barrels.jpg"/>
          </M.ui.CardMedia>
          <M.ui.CardActions>
            <M.ui.RaisedButton onClick={() => window.location.hash = 'log'} label="GO" />
          </M.ui.CardActions>
          <M.ui.CardText>
          	Revisit and study past tasting notess
          </M.ui.CardText>
        </M.ui.Card>
        <M.ui.Card  className='homeCard' style={cardStyle} >
          <M.ui.CardMedia overlay={<M.ui.CardTitle title="Flash Cards" subtitle="Create your own study material or randomly generate questions!"/>}>
            <img src="../books.jpg"/>
          </M.ui.CardMedia>
          <M.ui.CardActions>
            <M.ui.RaisedButton onClick={() => window.location.hash = 'decks'} label="GO" />
          </M.ui.CardActions>
          <M.ui.CardText>
          	Study and retain facts
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
				if (obj[v] === 2) {
					a.push(v)
				}
				return a
			}
			,[])
		if (results.length > 0) {
			return `Prominently ${results.join(';')}`
		} else {return ''}
	}
	parseSlight(obj) {
		var results = Object.keys(obj).reduce(
			(a, v, i) => {
				if (obj[v] === 1) {
					a.push(v)
				}
				return a
			}
			,[])
		if (results.length > 0) {
			return `Slightly ${results.join(';')}`
		} else {return ''}
	}
	render() {
		var listingView = {display: 'flex', backgroundColor: 'white', flexDirection: 'row', fontFamily: 'Roboto', textAlign: 'center', marginBottom: '1rem'},
			spanStyle = {fontWeight: '700'}
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
					color = v.attributes.wineColor,
					nonFruit = v.attributes.nonFruit
			return (<div style={listingView} data-date={`${v.createdAt.getMonth()}/${v.createdAt.getDay()}`} className='listing card'>
									<div style={{flexGrow: '1', flexBasis: '20%', border: '1px dashed #B2DFDB'}} className='about'>
										<ul>
											<li>{`${type} wine from ${conclusions.country}, ${conclusions.region}, ${conclusions.subregion}`}</li> 
											<li>{`${conclusions.producer}, ${conclusions.grapes}, ${conclusions.year}`}</li>
										</ul>
									</div>
								<div style={{flexGrow: '4', flexBasis: '20%'}}>
									<div style={{flexGrow: '1', border: '1px dashed #B2DFDB'}} className='structure'>
										<ul style={{columnCount: 2}}>
										<li>{`Color: ${color}`}</li> 
										<li>{`Acidity: ${acidity}`}</li> 
										<li>{`Alcohol: ${alcoxhol}`}</li> 
										<li>{`Sugar: ${sugar}`}</li>
										<li>{`Finish: ${finish}`}</li>
										</ul>
									</div>
									<div style={{ flexGrow: '1', border: '1px dashed #B2DFDB'}} className='notes'>
										<ul>
										<li><span style={spanStyle}>Fruit Qualities:</span> {this.parseProminent(fruitQuality)}
																							{this.parseSlight(fruitQuality)}</li>
										<li><span style={spanStyle}>Fruit Families:</span> {this.parseProminent(fruitFamily)} 
																							{this.parseSlight(fruitFamily)}</li>
										<li><span style={spanStyle}>Non-Fruit:</span> {this.parseProminent(nonFruit)} 
																						{this.parseSlight(nonFruit)}</li>
										<li><span style={spanStyle}>Mineral and Oak:</span> {this.parseProminent(mineral)} 
																							{this.parseSlight(mineral)}</li>
										</ul>
									</div>
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
			wine: null,
			showTut: true
		}
	}
	whiteTaste() {
		React.render(<T.WhiteTaste time={this.props.time} />, document.querySelector('.container'))
	}
	redTaste() {
		React.render(<T.RedTaste time={this.props.time} />, document.querySelector('.container'))
	}
	render() {
			var tutorial = this.state.showTut ? <Tutorial /> : <span />
		return (<div style={{alignItems: 'center'}} className='tasteLanding'>
					<div className='wineSelection card' style={{marginBottom: '3rem', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(241,111,92,1) 0%, rgba(246,41,12,1) 0%, rgba(240,47,23,1) 4%, rgba(248,80,50,1) 31%, rgba(211,47,47,1) 100%)'}} onClick={() => this.redTaste()}>
					Red
					</div>
					<div className='wineSelection card' style={{textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)'}} onClick={() => this.whiteTaste()}>
					White
					</div>
					{tutorial}
				</div>)
	}
}
export class Tutorial extends M.UI {
	constructor(props) {
		super(props)
	}
	render() {
		return (<div className='example'>
					<Img.Visual  />
					<Img.Swirl  />
					<Img.Nose  />
					<Img.Taste  />						
					<div className ='option'>None</div>
					<div className ='option selected'>Present</div>
					<div className ='option selected prominent'>Prominent</div>						
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
		if (window.location.hash === '#home') {
			this.scrollTop()
		} else {
			window.location.hash = 'home'
		}
	}
	render() {
		return (<M.ui.AppBar className={this.state.classOpacity} style={{background: '#4DD0E1', color: 'red', position: 'fixed', top: '0'}} title="Parting Glass"
  					iconElementLeft={<M.ui.IconButton onClick={() => this.goHome()}><Img.Logo /></M.ui.IconButton>} 
  					iconElementRight={<M.ui.IconButton onClick={() => this.logOut()}><Img.LogOut/></M.ui.IconButton>}>
  					</M.ui.AppBar>)}
}



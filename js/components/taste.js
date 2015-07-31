import * as M from '../MUI'
import React from 'react'
import * as Img from './images'

var White = Parse.Object.extend({
    initialize: function() {
        console.log('new white wine created')
        this.set('createdBy', Parse.User.current())
        this.set('type', 'White')
    },
    className: 'Wine',

})

var Red = Parse.Object.extend({
    initialize: function() {
        console.log('new red wine created')
        this.set('createdBy', Parse.User.current())
        this.set('type', 'Red')
    },
    className: 'Wine',

})


class Prompt extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var prompt = this.props.prompt
        return (<div className="Prompt">
            {prompt}
            </div>)
    }
}

class Option extends React.Component {
    constructor(props) {
        super(props)
    }
    update() {
        var newState = {},
        attribute = this.props.attr
        newState[attribute] = this.props.name
        this.props.node.setState(newState)
    }
    render() {
        var name = this.props.name,
            status = this.props.styleClass
        return (<div onClick={() => this.update()} className={`option invariant ${status}`}>
            <div className='text'>{this.props.name}</div>
            </div>)
    }
}


class VariantOption extends React.Component {
    constructor(props) {
        super(props)
    }
    update() {
        var newState = this.props.prevState,
            attribute = this.props.name
        newState[attribute]++
        newState[attribute] = newState[attribute]%3
        this.props.node.setState(newState)
    }
    render() {
        var status = this.props.styleClass
        return (<div className={`option variant ${status}`}  onClick={() => this.update()}>
            <div className='text'>{this.props.name}</div>
            </div>)
    }
}

class Options extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false
        }
        if (this.props.variant) {
            this.props.options.forEach((str) => this.state[str] = 0)
        }
    }
    submitVariant() {
        var newState = {},
            attribute = this.props.attr
        newState[attribute] = this.state
        this.props.wine.set(newState)
        this.nextScreen()
        $('html, body').animate({scrollTop: $(document).height()}, 500)
    }
    submit() {
        console.log('submitting')
        this.props.wine.set(this.state)
        this.nextScreen()
        console.log(this.state)
        console.log(this.props.wine)
        $('html, body').animate({scrollTop: $(document).height()}, 500)
    }
    nextScreen() {
        this.props.controller.setState({currentScreen: this.props.controller.state.currentScreen+1})
        console.log('next screen')
    }
    classifyInvariant(name) {
        if (this.state[this.props.attr] === name) {
            return 'selected'
        } else {return ''}
    }
    classifyVariant(name) {
        if (this.state[name] < 1) {
            return ''
        } else if (this.state[name] === 2) {
            return 'selected prominent'
        } else {return 'selected'}
    }
    render() {
        var attribute = this.props.attr,
            variant = this.props.variant,
            options = this.props.options
        if (variant === true) { 
            return (<div className={`options`}>{options.map((str) => 
                    <VariantOption styleClass={this.classifyVariant(str)} node={this} prevState={this.state} name={str}/>)}
                <a style={{position: 'absolute', width: '100px', height: '100px',left: '50%',top: '100%',transform: 'translateX(-50%)'}}  onClick={()=> this.submitVariant()}><Img.DownArrow /></a>
                </div>) 
            } else { return (<div className={`options`}>{options.map((str) => 
                    <Option styleClass={this.classifyInvariant(str)} attr={this.props.attr} node={this} name={str}/>)}
                <a style={{position: 'absolute', width: '100px', height: '100px',left: '50%',top: '100%',transform: 'translateX(-50%)'}}  onClick={()=> this.submit()}><Img.DownArrow /></a>
                </div>) }
    }
}


class WhiteVisual extends React.Component {
	constructor(props) {
		super(props)
	}
	render () {
		return (<div className={`attrScreen ${this.props.className}`}>
                    <Prompt prompt="Which description best matches the wine's color?"/>
                    <Options controller={this.props.controller} variant={false} wine={this.props.wine} node={this} attr='wineColor' options={['Straw', 'Yellow', 'Gold']} />
				</div>)
	}
}

class WhiteFruitFamily extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render () {
        return (<div className={`attrScreen ${this.props.className}`}>
            <Prompt prompt='Select Fruit Characterstics by Intensity'/>
            <Options controller={this.props.controller} variant={true} wine={this.props.wine} attr='fruitFamily' options={['Apple', 'Citrus', 'Stone', 'Tropical', 'Melon']} />
            </div>)
    }
}

class WhiteFruitQuality extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	render() {
        this.props.wine.set(this.state)
		return(<div className={`attrScreen ${this.props.className}`}>
            <Prompt prompt='Describe the quality of the fruit' />
            <Options controller={this.props.controller} variant={true} wine={this.props.wine} attr='fruitQuality' options={['Tart','Ripe','Jammy','Oxidized']} />
        </div>)
	}
}

class WhiteNonFruit extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (<div className={`attrScreen ${this.props.className}`}>
            <Prompt prompt='identify non fruit characteristics' />
            <Options controller={this.props.controller} variant={true} wine={this.props.wine} attr='nonFruit' options={['Floral', 'Vegetal', 'Honey/Wax', 'Baking Spice', 'Yeasty', 'Butter/Cream']} />
            </div>)
	}
}

class WhiteMineralOak extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
        this.props.wine.set(this.state)
		return(<div className={`attrScreen ${this.props.className}`}>
            <Prompt prompt='Mineral and Oak Characterstics' />
            <Options controller={this.props.controller} variant={true} wine={this.props.wine} attr='mineral' options={['Organic Earth', 'Inorganic Earth', 'Oak']} />
            </div>)
	}
}

class Finish extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (<div className={`attrScreen ${this.props.className}`}>
            <Prompt prompt='Finish' />
            <Options controller={this.props.controller} variant={false} wine={this.props.wine} attr='finish' options={['Short', 'Medium', 'Long']} />
		        </div>)
	}
}

class Sugar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div className={`attrScreen ${this.props.className}`}>
            <Prompt prompt='Sugar' />
            <Options controller={this.props.controller} variant={false} wine={this.props.wine} attr='sugar' options={['Dry', 'Off-Dry', 'Sweet']} />
            </div>)
    }
}

class Acid extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div className={`attrScreen ${this.props.className}`}>
            <Prompt prompt='Acidity' />
            <Options controller={this.props.controller} variant={false} wine={this.props.wine} attr='acidity' options={['Low', 'Moderate-Minus', 'Moderate', 'Moderate-Plus', 'High']} />
            </div>)
    }
}

class Alcohol extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div className={`attrScreen ${this.props.className}`}>
            <Prompt prompt='Alcohol Level' />
            <Options controller={this.props.controller} variant={false} wine={this.props.wine} attr='alcohol' options={['Low', 'Moderate-Minus', 'Moderate', 'Moderate-Plus', 'High']} />
            </div>)
    }
}

class GoogleConclusions extends React.Component {
    constructor(props) {
        super(props)
        this.state  = {

        }
    }
    componentDidMount() {
        var country = React.findDOMNode(this.refs.country),
            subregion = React.findDOMNode(this.refs.subregion)

        this.country = new google.maps.places.Autocomplete(country, {
            types: ['(regions)']
        });
        this.subregion = new google.maps.places.Autocomplete(subregion, {
            types: ['(regions)']
        });
    }
    setConclusions(attr) {
        var newState = {}
        newState[attr] = React.findDOMNode(this.refs[attr]).value
        this.setState(newState)
    }
    confirm() {
        var place = this.subregion.getPlace()
        this.props.wine.set({
            location: place.geometry.location
        })
        this.props.wine.set({
            conclusions: this.state
        })
        this.props.wine.save()
        window.location.hash = 'home'
    }
    render() {
        return (<div className={`attrScreen ${this.props.className || ''}`}>
                <input onChange={() => this.setConclusions('country')} ref='country' placeholder='Country'/>
                <input onChange={() => this.setConclusions('subregion')} ref='subregion'  placeholder='Subregion'/>
                <input onChange={() => this.setConclusions('grapes')} ref='grapes'placeholder='Grape/s'/>
                <input onChange={() => this.setConclusions('year')} ref='year'placeholder='Year'/>
                <input onChange={() => this.setConclusions('producer')} ref='producer'placeholder='Producer'/>
                <M.ui.RaisedButton primary={true} onClick={() => this.confirm()} label='confirm'/>
            </div>)
    }
}

class Conclusions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }  
    }
    setConclusions(attr) {
        var newState = {}
        newState[attr] = React.findDOMNode(this.refs[attr]).value
        this.setState(newState)
    }
    confirm() {       
        this.props.wine.set({
            conclusions: this.state
        })
        this.props.wine.save()
        window.location.hash = 'home'
    }
    render() {
        var mapStyle = this.state.mapOpen
        return(<div className={`attrScreen ${this.props.className || ''}`}>
                <input ref='country' className='country' onChange={() => this.setConclusions('country')} placeholder='Country'/>
                <input ref='region' className='region' onChange={() => this.setConclusions('region')} placeholder='Region'/>
                <input ref='subregion' className='subregion' onChange={() => this.setConclusions('subregion')} placeholder='Subregion'/>
                <input onChange={() => this.setConclusions('grapes')} ref='grapes'placeholder='Grape/s'/>
                <input onChange={() => this.setConclusions('year')} ref='year'placeholder='Year'/>
                <input onChange={() => this.setConclusions('producer')} ref='producer'placeholder='Producer'/>
                <M.ui.RaisedButton primary={true} onClick={() => this.confirm()} label='confirm'/>
            </div>)
    }
}


export class WhiteTaste extends M.UI {
	constructor(props){
		super(props)
        this.state = {
            obj: new White(),
            currentScreen: 0,
            screens: [WhiteVisual, WhiteFruitFamily, WhiteFruitQuality, WhiteNonFruit, WhiteMineralOak, Finish, Sugar, Acid, Alcohol, 
GoogleConclusions]
        }
        this.state.time = (this.props.time*60)
	}
    componentDidMount() {
        if (this.props.time < 10.5) {
            this.state.countdown = setInterval(() => this.subtract(), 1000)
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.countdown)
    }
    subtract() {
        this.setState({time: (this.state.time-1)})
        if (this.state.time === 0) {
            clearInterval(this.state.countdown)
        }
        this.checkClock()
    }
    checkClock() {
        if (this.state.time%30 === 0) {
            this.setState({minute: true})
        } else {this.setState({minute: false})}
    }
	render() {
        var percRemain = (this.state.time%30)/30*100,
        timerStyle = {
                position: 'fixed',
                left: '50%',
                bottom: '90%',
                height: '3px',
                width: `${percRemain}vw`,
                transform: 'translateX(-50%)',
                backgroundColor: '#f44336',
                transition: 'width 0.5s ease'
        },
        varclockDisplay = this.state.minute ? 1 : 0,
        displayStyle = {
            opacity: varclockDisplay,
            transition: 'opacity 0.5s ease',
            position: 'fixed',
            bottom: '80%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: '500',
            fontSize: '3rem',
            color: '#f44336'
        },
        minutes = Math.floor(this.state.time/60),
        seconds = (this.state.time%60 < 10) ? ('0'+ (this.state.time%60)) : this.state.time%60
		return (
            <div>
            <div className='timer' style={timerStyle}></div>
            <div className='timeDisplay' style={displayStyle}>{minutes}:{seconds}</div>
            { this.state.screens.map((scrn, index) => {
                let props = {
                    className: index <= this.state.currentScreen ? 'visible' : 'hidden',
                    controller: this,
                    wine: this.state.obj
                }
                return React.createElement(scrn, props)
            })}
            </div>
        )
        
    }
            
}

class RedVisual extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (<div className={`attrScreen ${this.props.className || ''}`}>
                    <Prompt prompt="Which description best matches the wine's color?"/>
                    <Options controller={this.props.controller} variant={false} wine={this.props.wine} node={this} attr='wineColor' options={['Garnet', 'Ruby', 'Purple']} />
                </div>)
    }
}

class RedFruitFamily extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render () {
        return (<div className={`attrScreen ${this.props.className || ''}`}>
            <Prompt prompt='Select Fruit Characterstics by Intensity'/>
            <Options controller={this.props.controller} variant={true} wine={this.props.wine} attr='fruitFamily' options={['Red', 'Black', 'Blue', 'Fig/Raisin']} />
            </div>)
    }
}

class RedFruitQuality extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return(<div className={`attrScreen ${this.props.className || ''}`}>
            <Prompt prompt='Describe the quality of the fruit' />
            <Options controller={this.props.controller} variant={true} wine={this.props.wine} attr='fruitQuality' options={['Tart','Ripe','Jammy','Oxidized']} />
        </div>)
    }
}

class RedNonFruit extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div className={`attrScreen ${this.props.className || ''}`}>
            <Prompt prompt='identify non fruit characteristics' />
            <Options controller={this.props.controller} variant={true} wine={this.props.wine} attr='nonFruit' options={['Floral', 'Vegetal', 'Herb/Mint', 'Peppercorn', 'Vanilla/Toast/Smoke', 'Game/Meat/Leather', 'Balsamic/Tar']} />
            </div>)
    }
}

class RedMineralOak extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(<div className={`attrScreen ${this.props.className || ''}`}>
            <Prompt prompt='Mineral and Oak Characterstics' />
            <Options controller={this.props.controller} variant={true} wine={this.props.wine} attr='mineral' options={['Organic Earth', 'Inorganic Earth', 'Oak']} />
            </div>)
    }
}


export class RedTaste extends M.UI {
    constructor(props){
        super(props)
        this.state = {
            obj: new Red(),
            currentScreen: 0,
            screens: [RedVisual, RedFruitFamily, RedFruitQuality, RedNonFruit, RedMineralOak, Finish, Sugar, Acid, Alcohol, GoogleConclusions]
        }
        this.state.time = (this.props.time*60)
    }
    componentDidMount() {
        if (this.props.time < 10.5) {
            this.state.countdown = setInterval(() => this.subtract(), 1000)
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.countdown)
    }
    subtract() {
        this.setState({time: (this.state.time-1)})
        if (this.state.time === 0) {
            clearInterval(this.state.countdown)
        }
        this.checkClock()
    }
    checkClock() {
        if (this.state.time%30 === 0) {
            this.setState({minute: true})
        } else {this.setState({minute: false})}
    }
    render() {
        var percRemain = (this.state.time%30)/30*100,
        timerStyle = {
                position: 'fixed',
                left: '50%',
                bottom: '90%',
                height: '3px',
                width: `${percRemain}vw`,
                transform: 'translateX(-50%)',
                backgroundColor: 'red',
                transition: 'width 0.5s ease'
        },
        varclockDisplay = this.state.minute ? 1 : 0,
        displayStyle = {
            opacity: varclockDisplay,
            transition: 'opacity 0.5s ease',
            position: 'fixed',
            bottom: '80%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
            color: 'red'
        },
        minutes = Math.floor(this.state.time/60),
        seconds = (this.state.time%60 < 10) ? ('0'+ (this.state.time%60)) : this.state.time%60
        return (
            <div>
            <div className='timer' style={timerStyle}></div>
            <div className='timeDisplay' style={displayStyle}>{minutes}:{seconds}</div>
            { this.state.screens.map((scrn, index) => {
                let props = {
                    className: index <= this.state.currentScreen ? 'visible' : 'hidden',
                    controller: this,
                    wine: this.state.obj
                }
                return React.createElement(scrn, props)
            })}
            </div>
        )
        
    }
            
}
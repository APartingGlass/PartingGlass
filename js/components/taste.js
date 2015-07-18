import * as M from '../MUI'
import React from 'react'

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
        console.log(this.props.node.state)
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
        return (<div className={`option variant ${status}`} onClick={() => this.update()}>
            <div className='text'>{this.props.name}</div>
            </div>)
    }
}

class Options extends React.Component {
    constructor(props){
        super(props)
        this.state = {
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
        console.log(this.props.wine)
        this.nextScreen()
        $('html, body').animate({scrollTop: $(document).height()}, 500)
    }
    submit() {
        this.props.wine.set(this.state)
        console.log(this.props.wine)
        this.nextScreen()
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
                <div className='button' onClick={() => this.submitVariant()}>V</div>
                </div>) 
            } else { return (<div className={`options`}>{options.map((str) => 
                    <Option styleClass={this.classifyInvariant(str)} attr={this.props.attr} node={this} name={str}/>)}
                <div className='button' onClick={()=> this.submit()}>V</div>
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

class LogWine extends React.Component {
    constructor(props) {
        super(props)
    }
    save() {
        this.props.wine.save()
        window.location.hash = 'home'
    }
    render() {
        return (<div className={`attrScreen ${this.props.className || ''}`} onClick={() =>this.save()} >Log Wine</div>)
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
        this.nextScreen()
    }
    nextScreen() {
        var current = this.props.controller.state.currentScreen
        current++
        this.props.controller.setState({currentScreen: current})
        console.log('next screen')
    }
    render() {
        return(<div className={`attrScreen ${this.props.className || ''}`}>
                <input onChange={() =>this.setConclusions('country')} ref='country' placeholder='Country'/>
                <input onChange={() => this.setConclusions('region')} ref='region'placeholder='Region'/>
                <input onChange={() => this.setConclusions('subregion')} ref='subregion' placeholder='Subregion'/>
                <input onChange={() => this.setConclusions('grapes')} ref='grapes'placeholder='Grape/s'/>
                <input onChange={() => this.setConclusions('year')} ref='year'placeholder='Year'/>
                <input onChange={() => this.setConclusions('producer')} ref='producer'placeholder='Producer'/>
                <div onClick={() => this.confirm()}>Confirm</div>
            </div>)
    }
}

export class WhiteTaste extends M.UI {
	constructor(props){
		super(props)
        this.state = {
            obj: new White(),
            currentScreen: 0,
            screens: [WhiteVisual, WhiteFruitFamily, WhiteFruitQuality, WhiteNonFruit, WhiteMineralOak, Finish, Sugar, Acid, Alcohol, Conclusions, LogWine]
        }
	}
	render() {
		return (
            <div>
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
            screens: [RedVisual, RedFruitFamily, RedFruitQuality, RedNonFruit, RedMineralOak, Finish, Sugar, Acid, Alcohol, Conclusions, LogWine]
        }
    }
    render() {
        return (
            <div>
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
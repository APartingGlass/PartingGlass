import * as M from '../MUI'
import React from 'react'

var White = Parse.Object.extend({
    className: 'White'
})


class Prompt extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var prompt = this.props.prompt
        return (<div className="Prompt">{prompt}</div>)
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
        var category = 'option ' + this.props.name
        return (<div onClick={() => this.update()} className={category}>{this.props.name}</div>)
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
        this.props.node.setState(newState)
    }
    render() {
        return (<div onClick={() => this.update()}>{this.props.name}</div>)
    }
}

class Options extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        if (this.props.variant) {
            this.props.options.forEach((str) => this.state[str] = 0)
        }
    }
    componentWillMount() {
        var newState = {}
        newState[this.state.attr] = this.state
        this.props.node.setState(newState)
    }
    render() {
        var attribute = this.props.attr,
            variant = this.props.variant,
            options = this.props.options
        if (variant === true) { 
            return (<div className="options">{options.map((str) => <VariantOption node={this} prevState={this.state} name={str}/>)}</div>) 
            } else { return (<div className="options">{options.map((str) => <Option attr={this.props.attr} node={this.props.node} name={str}/>)}</div>) }
    }
}


class WhiteVisual extends M.UI {
	constructor(props) {
		super(props)
	}
    update() {
        this.props.wine.set(this.state)
    }
	render () {
        setInterval(() => console.log(this.state), 1000)
		return (<div className='wineVisual'>
                    <Prompt prompt="Which description best matches the wine's color?"/>
                    <Options variant={false} node={this} attr='wineColor' options={['Straw', 'Yellow', 'Gold']} />
				</div>)
	}
}

class WhiteFruitFamily extends M.UI {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
        setInterval(() => console.log(this.state), 1000)
    }
    render () {
        return (<div>
            <Prompt prompt='Select Fruit Characterstics by Intensity'/>
            <Options variant={true} node={this} attr='fruitFamily' options={['Apple', 'Citrus', 'Stone', 'Tropical', 'Melon']} />
            </div>)
    }
}

class WhiteFruitQuality extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			tart: 0,
			ripe: 0,
			jammy: 0,
			baked: 0
		}
	}
	_parseStrength(val) {
        if (val === 2) {
            return 'Prominent'
        } else if (val ===1) {
            return 'Slight'
        } else {return 'None'}
    }
	render() {
        this.props.wine.set(this.state)
		return(<div>
            <M.ui.CardTitle title="Fruit Quality" subtitle="Identify Fruit Characteristics Qualitatively"/>
            <M.ui.FlatButton label='Tart'/> <M.ui.FlatButton label={this._parseStrength(this.state.tart)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({tart: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Ripe'/> <M.ui.FlatButton label={this._parseStrength(this.state.ripe)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({ripe: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Overripe/Jammy/Cooked'/> <M.ui.FlatButton label={this._parseStrength(this.state.jammy)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({jammy: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Baked/Oxidized'/> <M.ui.FlatButton label={this._parseStrength(this.state.baked)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({baked: val})} defaultValue={0} step={1} max={2} />
        </div>)
	}
}

class WhiteNonFruit extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			floral: 0,
			herbal: 0,
			honey: 0,
			spice: 0,
			yeast: 0,
			butter: 0
		}
	}
	_parseStrength(val) {
        if (val === 2) {
            return 'Prominent'
        } else if (val ===1) {
            return 'Slight'
        } else {return 'None'}
    }
	render() {
        this.props.wine.set(this.state)
		return (<div>
              <M.ui.CardTitle title="Non-Fruit Quality" subtitle="Identify Non-Fruit Characteristicsc"/>
            <M.ui.FlatButton label='Floral'/> <M.ui.FlatButton label={this._parseStrength(this.state.floral)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({floral: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Herbal/Vegetal'/> <M.ui.FlatButton label={this._parseStrength(this.state.herbal)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({herbal: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Honey/Ginger/Wax/Botrytis'/> <M.ui.FlatButton label={this._parseStrength(this.state.honey)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({honey: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Vanilla/Baking-Spice/Smoke/Toast'/> <M.ui.FlatButton label={this._parseStrength(this.state.spice)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({spice: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Yeast/Dough/Baked-Bread'/> <M.ui.FlatButton label={this._parseStrength(this.state.yeast)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({yeast: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Butter/Cream'/> <M.ui.FlatButton label={this._parseStrength(this.state.butter)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({butter: val})} defaultValue={0} step={1} max={2} />
            </div>)
	}
}

class WhiteNonFruitTwo extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			earth: 0,
			mineral: 0,
			oak: 0
		}
	}
	_parseStrength(val) {
        if (val === 2) {
            return 'Prominent'
        } else if (val ===1) {
            return 'Slight'
        } else {return 'None'}
    }
	render() {
        this.props.wine.set(this.state)
		return(<div>
              <M.ui.CardTitle title="Minerality and Oak" />
            <M.ui.FlatButton label='Organic Earth: Wet Leaves, Brett, Mushrooms'/> <M.ui.FlatButton label={this._parseStrength(this.state.earth)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({earth: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Inorganic Earth: Stone, Rock, Mineral, Sulfur'/> <M.ui.FlatButton label={this._parseStrength(this.state.mineral)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({mineral: val})} defaultValue={0} step={1} max={2} />
            <M.ui.FlatButton label='Oak'/> <M.ui.FlatButton label={this._parseStrength(this.state.oak)}/>
            <M.ui.Slider onChange={(e, val) => this.setState({oak: val})} defaultValue={0} step={1} max={2} />
            </div>)
	}
}

class WhiteStructure extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			phenol: 0,
			sweetness: 0,
			acid: 0,
			alcohol: 0
		}
	}
	_parseStrength(val) {
        if (val === 2) {
            return 'High'
        } else if (val ===1) {
            return 'Moderate/Moderate-Plus'
        } else {return 'Low/Moderate-Minus'}
    }
	render() {
        this.props.wine.set(this.state)
		return (<div>
		              <M.ui.CardTitle title="Structure" />
		            <M.ui.FlatButton label='Bitterness/Phenolics'/> <M.ui.FlatButton label={this._parseStrength(this.state.phenol)}/>
		            <M.ui.Slider onChange={(e, val) => this.setState({phenol: val})} defaultValue={0} step={1} max={2} />
		            <M.ui.FlatButton label='Sweetness'/> <M.ui.FlatButton label={this._parseStrength(this.state.sweetness)}/>
		            <M.ui.Slider onChange={(e, val) => this.setState({sweetness: val})} defaultValue={0} step={1} max={2} />
		            <M.ui.FlatButton label='Acid'/> <M.ui.FlatButton label={this._parseStrength(this.state.acid)}/>
		            <M.ui.Slider onChange={(e, val) => this.setState({acid: val})} defaultValue={0} step={1} max={2} />
		            <M.ui.FlatButton label='Alcohol'/> <M.ui.FlatButton label={this._parseStrength(this.state.alcohol)}/>
		            <M.ui.Slider onChange={(e, val) => this.setState({alcohol: val})} defaultValue={0} step={1} max={2} />           
		        </div>)
	}
}

class Conclusions extends M.UI {
    constructor(props) {
        super(props)
        this.state = {
            temp: null,
            grape: null,
            world: null,
            country: null,
            age: null
        }
    }
    render() {
        var temp = [
            { payload: '1', text: 'Cool to Moderate' },
            { payload: '2', text: 'Moderate to Warm' },
            { payload: '3', text: 'Hot' }],
        grape = [
            { payload: '1', text: 'Chenin Blanc or Pinot Gris' },
            { payload: '2', text: 'Reisling or Albarino' },
            { payload: '3', text: 'Gewurtz or Torrontes' },
            { payload: '4', text: 'Pinot Grigio' },
            { payload: '5', text: 'Chardonnay' },
            { payload: '6', text: 'Sauvignon Blanc'}],
        world = [
            { payload: '1', text: 'Old World' },
            { payload: '2', text: 'New World' }],
        oldCountries = [
            { payload: '1', text: 'France' },
            { payload: '2', text: 'Spain' },
            { payload: '3', text: 'Italy' },
            { payload: '4', text: 'Germany' },
            { payload: '5', text: 'Portugal' },
            { payload: '6', text: 'Austria' },
            { payload: '7', text: 'Greece' },
            { payload: '8', text: 'Switzerland'}],
        newCountries = [
            { payload: '1', text: 'U.S.A.' },
            { payload: '2', text: 'New Zealand' },
            { payload: '3', text: 'Argentina' },
            { payload: '4', text: 'Chile' },
            { payload: '5', text: 'Australia'},
            { payload: '6', text: 'South Africa'}],
        age = [
            { payload: '1', text: '1-3 years' },
            { payload: '2', text: '4-6 years' },
            { payload: '3', text: '7+ years' }]
            this.props.wine.set(this.state)
        return(<div>
                <M.ui.CardTitle title="Conclusions" />
                <M.ui.DropDownMenu menuItems={temp} />
                <M.ui.DropDownMenu menuItems={grape} />
                <M.ui.DropDownMenu menuItems={world} />
                <M.ui.DropDownMenu menuItems={oldCountries} />
                <M.ui.DropDownMenu menuItems={age} />    
            </div>)
    }
}


export class WhiteTaste extends M.UI {
	constructor(props){
		super(props)
        this.obj = new White()
	}
	render() {
		return (<div>
            <WhiteFruitFamily wine={this.obj} />
                </div>)
            }
	}



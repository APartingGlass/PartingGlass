import React from 'react'
import * as M from '../MUI'


var Deck = Parse.Object.extend({
    initialize: function() {
        console.log('new deck')
        this.set('createdBy', Parse.User.current())
    },
    className: 'Decks',

})

var Card = Parse.Object.extend({
    initialize: function() {
        console.log('new card')
        this.set('createdBy', Parse.User.current())
    },
    className: 'Cards',

})

var acidityLevel = (conclusions, acidity) => {
    return {
        question: `What is the acidity level of ${conclusions.grapes} from ${conclusions.producer}?`,
        answer: `${acidity}`
    }
}
var geography = (conclusions) => {
    return {
        question: `What country is ${conclusions.subregion} located in?`,
        answer: `${conclusions.country}`
    }
}
var alcoholLevel = (conclusions, alcohol) => {
    return {
        question: `what kind of alcohol level does ${conclusions.grapes} from ${conclusions.producer} have?`,
        answer: `${alcohol}`
    }
}

var genRandomQ = function(wine) {
    var acidity = wine.attributes.acidity,
        alcohol = wine.attributes.alcohol,
        finish = wine.attributes.finish,
        conclusions = wine.attributes.conclusions,
        fruitFamily = wine.attributes.fruitFamily,
        fruitQuality = wine.attributes.fruitQuality,
        mineral = wine.attributes.mineral,
        sugar = wine.attributes.sugar,
        type = wine.attributes.type,
        color = wine.attributes.color,
        nonFruit = wine.attributes.nonFruit,
        questions = [acidityLevel(conclusions, acidity), geography(conclusions), alcoholLevel(conclusions, alcohol)],
        randomIndex = Math.floor(Math.random() * questions.length)
    return questions[randomIndex]
}
class CardsView extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			content: []
		}
	}
	componentDidMount() {
		this.pullCards()
	}
	pullCards() {
		this.state.query = new Parse.Query('Cards')
		this.state.query.equalTo('deck', this.props.deck)
		this.updateCards()
	}
	updateCards() {
		this.state.query.find({
			success: function(results) {

			},
			error: function(error) {
				console.log(error)
			}
		}).then((results) => this.setState({
			content: results
		}))
	}
	newCard() {
		this.newCard = new Card
		this.newCard.set('deck', this.props.deck)
		this.newCard.set('question', this.state.question)
		this.newCard.set('answer', this.state.answer)
		this.newCard.save().then(() =>this.updateCards())
	}
	goBack() {
		window.location.hash = 'decks'
	}
	updateState(e, prop) {
		var newState = {}
		newState[prop] = e.target.value
		this.setState(newState)
	}
	render() {
		return (<div className='grid grid-2-400 grid-4-600'>
				<M.ui.Card>
					<M.ui.CardActions>
    				<M.ui.FlatButton  onClick={() => this.goBack()} label='Back to Decks'/>
    				</M.ui.CardActions>	
				</M.ui.Card>			
				<M.ui.Card>
					<input onChange={(e) => this.updateState(e, 'question')} placeholder='question'/>
					<input onChange={(e) => this.updateState(e, 'answer')} placeholder='answer'/>
					<M.ui.CardActions>
    				<M.ui.FlatButton  onClick={() => this.newCard()} label='New Card'/>
    				</M.ui.CardActions>	
				</M.ui.Card>
				{this.state.content.map((card) => <FlashCard card={card} parent={this} content={card.attributes}/>)}
			</div>)
	}
}

class DeckBox extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			deck: this.props.deck,
			owner: false
		}
		if (this.props.deck.attributes.createdBy.id === Parse.User.current().id) {
			this.state.owner = true
		}
	}
	pullCards() {
		window.location.hash = 'cards'
		React.render(<CardsView deck={this.state.deck}/>, document.querySelector('.container'))
	}
	delete() {
		this.state.deck.destroy().then(this.props.parent.checkforDecks())
	}
	render() {
		var destroyButton = this.state.owner ? <M.ui.RaisedButton primary={true} onClick={() => this.delete()} label='delete'/> : <span/>
		return(<M.ui.Card style={{textAlign: 'center', minHeight: '75px', padding: '2rem'}}> 
			<M.ui.CardTitle title={this.props.deck.attributes.name} />
			<M.ui.CardActions>
    		<M.ui.RaisedButton secondary={true}  onClick={() => this.pullCards()} label='Study'/>
    		</M.ui.CardActions>
    		{destroyButton}
			</M.ui.Card>
			)
	}
}

class FlashCard extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			showAnswer: false,
			owner: false
		}
		if (!this.props.card) {return}
		if (this.props.card.attributes.createdBy.id === Parse.User.current().id) {
			this.state.owner = true
		}
	}
	toggleAnswer() {
		this.setState({
			showAnswer: !this.state.showAnswer
		})
		console.log(this.state)
	}
	delete() {
		if (!this.props.card) {return }
		this.props.card.destroy().then(this.props.parent.updateCards())
	}
	render() {
		var cardDisplay = this.state.showAnswer ? '1' : '0',
			deleteButton = this.state.owner ? <M.ui.RaisedButton primary={true} onClick={() => this.delete()} label='delete'/> : <span/>
		return (<M.ui.Card style={{padding: '1rem', textAlign: 'center'}}>
			        <M.ui.CardText>
			        Question: {this.props.content.question}
          			</M.ui.CardText>
   	    		<M.ui.CardActions>
    		    <M.ui.FlatButton  onClick={() => this.toggleAnswer()} label="Show Answer"/>
    		    </M.ui.CardActions>
          			<M.ui.CardText style={{opacity: cardDisplay}}>
			        Answer: {this.props.content.answer}
          			</M.ui.CardText>
          		{deleteButton}
			</M.ui.Card>)
	}
}

class DeckGrid extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			content: []
		}
	}
	componentDidMount() {
		this.state.query = new Parse.Query('Decks')
		this.checkforDecks()
	}
	checkforDecks() {
		this.state.query.find({
			success: function(results) {
			},
			error: function(error) {
				console.log(error)
			}
		}).then((results) => this.setState({content: results}))
	}
	newDeck() {
		swal(
			{title: 'New Deck', text: "Name your Deck",   type: "input",   showCancelButton: true,   closeOnConfirm: true,   animation: "slide-from-top" }
			, function(inputData) {
			if (inputData === false) {
				return
			} else if (inputData === '') {
				return 
			} else {
			this.newDeck = new Deck
			this.newDeck.set('name', inputData)
			this.newDeck.save().then(() =>React.render(<CardsView deck={this.newDeck}/>, document.querySelector('.container')))
			}
		})
	}
	render() {
		return (<div style={{marginTop: '3rem'}}className='decks grid grid-2-400 grid-4-600'>
				<M.ui.Card>
					<M.ui.CardActions>
    				<M.ui.FlatButton  onClick={() => this.newDeck()} label='New Deck'/>
    				</M.ui.CardActions>					
				</M.ui.Card>
					{this.state.content.map((v) => <DeckBox parent={this} deck={v}/>)}
				</div>)
	}
}

export class DecksView extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	generateQuestion(wine) {
		this.setState({
			randomCard: genRandomQ(wine)
		})
	}
	randomWineQuestion() { 
		var promise = Parse.Cloud.run('randomUserWine', {}, {
            success: function (result) {
            },
            error: function (error) {
                alert(error)
            }
        })
        promise.then((result) => this.generateQuestion(result))
	}
	render() {
		var randomCard = this.state.randomCard ? <FlashCard content={this.state.randomCard}/> : <span />
		return(<div>
				<M.ui.Card className='card'>
        		<M.ui.CardTitle title="Random Card" subtitle="Automatically Generate A Card from your previous tastings"/>
   	    		<M.ui.CardActions>
    		    <M.ui.FlatButton  onClick={() => this.randomWineQuestion()} label='Generate'/>
    		    </M.ui.CardActions>
        		</M.ui.Card>
        		{randomCard}
        		<DeckGrid/>
			</div>)
	}

}

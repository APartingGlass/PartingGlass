import React from 'react'
import * as M from '../MUI'

var acidityLevel = (conclusions, acidity) => {
    return {
        question: `What is the acidity level of ${conclusions.grapes} from ${conclusions.subregion}?`,
        answer: `${acidity}`
    }
}
var geography = (conclusions) => {
    return {
        question: `What region is ${conclusions.subregion} located in?`,
        answer: `${conclusions.region}`
    }
}
var alcoholLevel = (conclusions, alcohol) => {
    return {
        question: `what kind of alcohol level does ${conclusions.grapes} from ${conclusions.subregion} have?`,
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


export class CardView extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	generateQuestion(wine) {
		console.log(wine)
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
    		    <M.ui.FlatButton onClick={() => this.randomWineQuestion()} label='Generate'/>
    		    </M.ui.CardActions>
        		</M.ui.Card>
        		{randomCard}
				<div className='decks grid grid-2-400 grid-4-600'>

				</div>
			</div>)
	}

}

class Deck extends M.UI {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<FlashCard/>
			)
	}
}

class FlashCard extends M.UI {
	constructor(props) {
		super(props)
		this.state = {
			showAnswer: false
		}
	}
	toggleAnswer() {
		this.setState({
			showAnswer: !this.state.showAnswer
		})
		console.log(this.state)
	}
	render() {
		var cardDisplay = this.state.showAnswer ? '1' : '0'
		return (<M.ui.Card className='card'>
			        <M.ui.CardText>
			        Question: {this.props.content.question}
          			</M.ui.CardText>
   	    		<M.ui.CardActions>
    		    <M.ui.FlatButton onClick={() => this.toggleAnswer()} label="Show Answer"/>
    		    </M.ui.CardActions>
          			<M.ui.CardText style={{opacity: cardDisplay}}>
			        Answer: {this.props.content.answer}
          			</M.ui.CardText>
			</M.ui.Card>)
	}
}
import React from 'react'
import * as M from '../MUI'

export class CardView extends M.UI {
	constructor(props) {
		super(props)
	}
	componentDidMount() {

	}
	render() {
		return(<div>
				<M.ui.Card className='card'>
        		  <M.ui.CardTitle title="Random Card" subtitle="Automatically Generate A Card from your previous tastings"/>
   	    		  <M.ui.CardActions>
    		    <M.ui.FlatButton label="Generate"/>
    		    </M.ui.CardActions>
        		<FlashCard/>
        		</M.ui.Card>
				<div className='grid grid-2-400 grid-4-600'>

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
	}
	render() {
		return (<M.ui.Card>
			        <M.ui.CardText>
			        Question:
          			</M.ui.CardText>
   	    		<M.ui.CardActions>
    		    <M.ui.FlatButton label="Show Answer"/>
    		    </M.ui.CardActions>
          			<M.ui.CardText>
			        Answer:
          			</M.ui.CardText>
			</M.ui.Card>)
	}
}
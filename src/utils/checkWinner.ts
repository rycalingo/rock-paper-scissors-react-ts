import { ActionTypes, OptionActionKind } from "../reducers/scoreReducerTypes";

export const checkWinner = (
  dispatch: React.Dispatch<ActionTypes>,
  playerHand: string,
  computerHand: string
  ) => {
    // rock
    if (playerHand === 'rock' && computerHand === 'rock') {
      dispatch({type: OptionActionKind.DRAW, payload: "We have a draw"})

    } else if(playerHand === 'rock' && computerHand === 'paper') {
      dispatch({type: OptionActionKind.COMPUTER_WINS, payload: "Paper beats Rock!"})

    } else if(playerHand === 'rock' && computerHand === 'scissors') {
      dispatch({type: OptionActionKind.PLAYER_WINS, payload: "Rock beats Scissors!"})


    // papper
    }  else if (playerHand === 'paper' && computerHand === 'paper') {
      dispatch({type: OptionActionKind.DRAW, payload: "We have a draw"})

    } else if(playerHand === 'paper' && computerHand === 'scissors') {
      dispatch({type: OptionActionKind.COMPUTER_WINS, payload: "Scissors beats Paper!"})

    } else if(playerHand === 'paper' && computerHand === 'rock') {
      dispatch({type: OptionActionKind.PLAYER_WINS, payload: "Paper beats Rock!"})

    
    // scissors
    }  else if (playerHand === 'scissors' && computerHand === 'scissors') {
      dispatch({type: OptionActionKind.DRAW, payload: "We have a draw"})

    } else if(playerHand === 'scissors' && computerHand === 'rock') {
      dispatch({type: OptionActionKind.COMPUTER_WINS, payload: "Rock beats Scissors!"})

    } else if(playerHand === 'scissors' && computerHand === 'paper') {
      dispatch({type: OptionActionKind.PLAYER_WINS, payload: "Scissors beats Paper!"})
    }
}
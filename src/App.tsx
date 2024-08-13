import { useEffect } from 'react';
import './App.scss';
import FullPageLoader from './components/Score.tsx';
import Score from './components/Score.tsx';
import Game from './components/Game.tsx';
import { useQuiz, Question} from './QuizContext.tsx';

function App() {

  const {state, dispatch} = useQuiz();
 // console.log(state);

 async function fetchQuestions(){

 try{

    dispatch({type: "setStatus", payload: "fetching"});
    dispatch({type: "setUserAnswer", payload: null});
    const response = await fetch('https://opentdb.com/api.php?amount=1&category=21');
    let data = await(response.json());
    if (data.response_code === 0){

      let question: Question = data.results[0];

      let randomIndex = Math.round(Math.random() * question.incorrect_answers.length)
      question.incorrect_answers.splice( randomIndex, 0, question.correct_answer)

      dispatch({type: "setStatus", payload: "ready"});
      dispatch({type: "setQuestion", payload: question});


    }else {
      dispatch({type: "setStatus", payload: "error"});
    }
 }catch (err){
  console.log('error', err);
  dispatch({type: "setStatus", payload: "error"});
  }
}

  useEffect(()=>{
    if (state.gameStatus == 'idle'){
      fetchQuestions();
    }
  })

  return (
    <>
    {
      state.gameStatus == 'idle' ?
      <FullPageLoader /> : state.gameStatus == 'error' ? 
      <p>Error...</p> : 
      <>
        <Score />
        <Game /> 
    </> 
    
    }
    
  </> 
  )

}
export default App

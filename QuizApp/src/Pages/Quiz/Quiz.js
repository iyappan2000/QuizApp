import { CircularProgress,Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";
const Quiz = ({ name, questions, score, setScore, setQuestions}) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  console.log(questions);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  // const [seconds, setSeconds] = useState(10);
  // useEffect(() => {
  //   if (seconds > 0) {
  //     setTimeout(() => setSeconds(seconds - 1), 1000);
  //   } else {
  //     setSeconds('BOOOOM!');
  //   }
  // })
  const [stop, setStop] = useState(false);
  const [questionNumber] = useState(1);
  // function Timer({ setStop, questionNumber }) {

    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (timer === 0) return setStop(true);
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [setStop, timer]);

    useEffect(() => {
        setTimer(10);
    }, [questionNumber]);

    // return timer
// }
  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions ? (
        <>
          {stop ? (
            <div>
            <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>
              {/* {questions[currQues].difficulty} */}
              Score : {score}
              
            </span>
            {/* <div className="result" style={{marginLeft:'80px'}}>
                <span className="title">Final Score : {score}</span>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{ alignSelf: "center", marginTop: 20 }}
                  href="/"
                >
                  Go to homepage
                </Button>
              </div> */}
          </div>
          </div>
          ):(
            <>
             <div>
            <h2>{timer}</h2> 
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            setTimer= {setTimer}
          />
            </>
          )}
          
         
          
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
      
    </div>
  );
};

export default Quiz;

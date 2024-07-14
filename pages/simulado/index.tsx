import { useEffect, useState } from "react";
import QuestionCard, { Question } from "../../components/QuestionCard";
import styles from "@/styles/Simulados.module.css";

export default function Simulado() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  function answerQuestion() {
    if (selected || selected == 0) {
      setAnswer(currentQuestion.answer);
      setQuestionIndex(questionIndex + 1);
    }
  }

  function previousQuestion() {
    console.log(questionIndex);
    if (questionIndex > 0) {
      setAnswer(null);
      setQuestionIndex(questionIndex - 1);
      setCurrentQuestion(questions[questionIndex - 1]);
    }
  }

  function nextQuestion() {
    setAnswer(null);
    setSelected(null);
    setCurrentQuestion(questions[questionIndex]);
  }

  function answerExists(): boolean {
      return answer != null || answer != undefined
  }

  useEffect(() => {
    const questionsPath = localStorage.getItem("path-questoes");
    if (questionsPath) {
      fetch(questionsPath)
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data);
          setCurrentQuestion(data[0]);
          setQuestionIndex(1);
          setLoading(false);
          setSelected(null);
          setAnswer(null);
        })
        .catch((error) => console.error("Error loading questions:", error));
    }
  }, []);

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.card}`}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <QuestionCard
                answer={answer}
                setAnswer={setAnswer}
                rightQuestion={currentQuestion.rightQuestion}
                setSelected={setSelected}
                selected={selected}
                correct={currentQuestion.correct}
                head={currentQuestion.head}
                options={currentQuestion.options}
              />
              <div className={`${styles["confirm-button-container"]}`}>
                <button
                  onClick={previousQuestion}
                  className={`${styles["back-button"]}`}
                >
                  ANTERIOR
                </button>
                {!answerExists() ? (
                  <button
                    onClick={() => answerQuestion()}
                    className={`${styles["confirm-button"]}`}
                  >
                    CONFIRMAR
                  </button>
                ) : (
                  <button
                    onClick={() => nextQuestion()}
                    className={`${styles["next-button"]}`}
                  >
                    PROXIMA
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

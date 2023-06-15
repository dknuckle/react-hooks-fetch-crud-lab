import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.log(error));
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedQuestions = questions.filter(
          (question) => question.id !== id
        );
        setQuestions(updatedQuestions);
      })
      .catch((error) => console.log(error));
  };

  const updateCorrectIndex = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === id) {
            return { ...question, correctIndex };
          }
          return question;
        });
        setQuestions(updatedQuestions);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <QuestionItem
            key={`${question.id}-${index}`} // Generate a unique key
            question={question}
            onDelete={deleteQuestion}
            onUpdateCorrectIndex={updateCorrectIndex}
            questionNumber={index}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

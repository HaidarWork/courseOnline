import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Box } from "@chakra-ui/react";
// import ReactPDF, {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// const myDocument = ({ quizResult, questions }) => {
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Image source={logo}></Image>
//         <Text>النتيجة النهائية</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>عدد الاسئلة الكلي</Text>:<Text>{questions.length}</Text>
//         <Text>الإجابات الصحيحة:</Text>:<Text>{quizResult.correctAnswers}</Text>
//         <Text>الإجابات الخاطئة:</Text>:<Text>{quizResult.wrongAnswers}</Text>
//         <Text>النتجية</Text>:<Text>{quizResult.score}</Text>
//         <Text>من اصل 100</Text>
//       </View>
//     </Page>
//   </Document>;
// };
const Result = ({ quizResult, questions }) => {
  return (
    <div className="result">
      <h3>النتيجة النهائية: </h3>
      <p>
        عدد الاسئلة الكلي: <span>{questions.length}</span>
      </p>
      <p>
        النتجية:<span> {quizResult.score}</span>
        <span>من اصل 100</span>
      </p>
      <p>
        الإجابات الصحيحة:<span> {quizResult.correctAnswers}</span>
      </p>
      <p>
        الإجابات الخاطئة:<span> {quizResult.wrongAnswers}</span>
      </p>
    </div>
  );
};

const Exam = ({ questions }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [user, setUser] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [answers, setAnswers] = useState([{ id: 0, state: false }]);

  if (!questions) {
    questions = [{}];
  }
  const { question, choices, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("status"));
    if (!status) {
      setError(true);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const sendResult = () => {
    emailjs
      .send(
        "service_1sczfpn",
        "template_f35qcjl",
        {
          email: user.email,
          name: user.username,
          score: result.score,
          correctAnswer: result.correctAnswers,
          wrongAnswers: result.wrongAnswers,
          numOfquestions: questions.length,
        },
        "7KPTX0AshuZ9DJs4m"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const onClickNext = (e) => {
    e.preventDefault();
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 10,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    setAnswers((prev) =>
      selectedAnswer
        ? [
            ...prev,
            {
              id: answers[activeQuestion].id + 1,
              state: true,
            },
          ]
        : [...prev, { id: answers[activeQuestion].id + 1, state: false }]
    );
    console.log(answers);
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
      sendResult();
      // ReactPDf.render(
      //   <myDocument quizResult={result} questions={questions} />,
      //   `${__dirname}/${user.username}.pdf`
      // );
    }
  };

  const onClickPrev = () => {
    setSelectedAnswerIndex(null);
    setActiveQuestion((prev) => prev - 1);
    setResult((prev) =>
      answers[activeQuestion].state
        ? {
            ...prev,
            score: prev.score - 10,
            correctAnswers: prev.correctAnswers - 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers - 1 }
    );
    const updateAnswers = answers.filter(
      (answer) => answer.id !== activeQuestion
    );
    setAnswers(updateAnswers);
    console.log(updateAnswers);
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  if (showResult) {
    return <Result quizResult={result} questions={questions} />;
  } else {
    return error ? (
      <Box
        fontSize={"x-large"}
        fontWeight={"700"}
        textAlign={"center"}
        color={"red"}
      >
        يجب عليك أن تقوم بإكمال الدروس المطلوبة
      </Box>
    ) : (
      <div className="quiz-container">
        <div className="row">
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
        </div>
        <h2>
          {question.split("\n").map((line) => (
            <div key={line}>
              {line} <br />
            </div>
          ))}
        </h2>
        <ul>
          {choices.map((answer, index) => (
            <li
              onClick={() => onAnswerSelected(answer, index)}
              key={answer}
              className={
                selectedAnswerIndex === index ? "selected-answer" : null
              }
            >
              {answer}
            </li>
          ))}
        </ul>
        <div className="flex-right">
          <button
            onClick={onClickNext}
            disabled={selectedAnswerIndex === null}
            className="btn"
          >
            {activeQuestion === questions.length - 1 ? "انهاء" : "التالي"}
          </button>
          <button
            onClick={onClickPrev}
            disabled={activeQuestion === 0}
            className="btn"
          >
            السابق
          </button>
        </div>
      </div>
    );
  }
};

export default Exam;

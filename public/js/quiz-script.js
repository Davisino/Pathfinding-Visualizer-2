document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  checkAnswers();
});
document.addEventListener("DOMContentLoaded", () => {
  const tryAgainButton = document.getElementById("try-again-button");
  tryAgainButton.addEventListener("click", resetQuiz);
});

function resetQuiz() {
  const allInputs = document.querySelectorAll(
    'input[type="radio"], input[type="checkbox"]'
  );
  allInputs.forEach((input) => {
    input.checked = false;
  });

  document.getElementById("feedback").innerHTML = "";
}
function checkAnswers() {
  const correctAnswers = {
    question1: "A",
    question2: ["C"],
    question3: "D",
    question4: "A",
    question5: "C",
  };

  let score = 0;
  try {
    // Question 1
    if (
      document.querySelector('input[name="question1"]:checked').value ===
      correctAnswers.question1
    ) {
      score++;
    }

    // Question 2
    const question2Inputs = document.querySelectorAll(
      'input[name="question2"]:checked'
    );
    let question2Correct = true;
    if (question2Inputs.length === correctAnswers.question2.length) {
      question2Inputs.forEach((input) => {
        if (!correctAnswers.question2.includes(input.value)) {
          question2Correct = false;
        }
      });
    } else {
      question2Correct = false;
    }

    if (question2Correct) {
      score++;
    }

    // Question 3
    if (
      document.querySelector('input[name="question3"]:checked').value ===
      correctAnswers.question3
    ) {
      score++;
    }

    // Question 4
    if (
      document.querySelector('input[name="question4"]:checked').value ===
      correctAnswers.question4
    ) {
      score++;
    }

    // Question 5
    if (
      document.querySelector('input[name="question5"]:checked').value ===
      correctAnswers.question5
    ) {
      score++;
    }

    let achievement = score > 2 ? "Well done!" : "Oops...";
    document.getElementById(
      "feedback"
    ).innerHTML = `${achievement} Your score is ${score} out of 5`;
    document.getElementById("try-again-button").hidden = false;
  } catch (e) {
    console.log("Make sure you answered all questions");
    console.log(e);
  }
}

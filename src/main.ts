import { Question, questions } from "./questions"

let app = {

    currPosition: 0,
    score: 0,

    // METHOD to start application
    init: function () {
        this.currPosition = 0;
        this.score = 0;

        // select DOM element for alternatives and add text
        const alts = document.querySelectorAll(".alternative");

        alts.forEach((el, i) => {
            el.addEventListener("click", () => {
                // check correct answer
                this.checkAnswer(i);
            });
        });

        // refresh stats
        this.updateStats();

        // show first question
        this.showQuestion(questions[this.currPosition]);
    },


    // METHOD to show question
    showQuestion: function (question: Question) {

        // select DOM element for title and add text
        let questionTitle = document.getElementById("title");

        if (questionTitle) {
            questionTitle.textContent = question.title;
        }

        // select DOM element for alternatives
        let alts = document.querySelectorAll(".alternative");
        alts.forEach((el, i) => {
            el.textContent = question.alternatives[i];
        });
    },

    // METHOD to check answer
    checkAnswer: function (userSelected: number) {
        let currQuestion = questions[this.currPosition];


        if (currQuestion.correctAnswer == userSelected) {
            this.score++;
            this.showResult(true);
        } else {
            this.showResult(false);
        }

        // increase position
        this.increasePosition();

        // show next question
        this.showQuestion(questions[this.currPosition]);

        this.updateStats();
    },

    increasePosition: function () {
        this.currPosition++;

        if (this.currPosition == questions.length) {
            this.currPosition = 0;
        }
    },

    updateStats: function () {
        let score = document.getElementById("score");

        if (score) {
            score.textContent = `${this.score}`;
        }
    },

    showResult: function (isCorrect: boolean): void {
        let resultText = document.getElementById("result-text");

        let result = "";

        let currQuestion = questions[this.currPosition]
        let currQuestionTitle = questions[this.currPosition].title
        // get correct answer index
        let correctAnsIndex = currQuestion.correctAnswer

        // get correct answer text
        let correctAnsText = currQuestion.alternatives[correctAnsIndex]

        if (isCorrect) {

            result = "Correct Answer!\n" + `${currQuestionTitle} translates to ${correctAnsText}` ;
        } else {
            result = "Wrong Answer!\n" + `The correct answer is ${correctAnsText}`;
        }

        if (resultText) {
            resultText.textContent = result
        }
    },
};

app.init();

// let btn = document.getElementById('btn')

// if (btn) {
//     btn.addEventListener('click', function(){
//         console.log('Clicked!')
//     })
// }

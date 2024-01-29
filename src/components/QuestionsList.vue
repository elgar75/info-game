<template>
    <div class="screen" v-if="questions">
        <div class="question-container">
            <img class="brainimage" style="width: 80px;left: -40px;top: -50px;position: absolute; "
                src="../assets/img copy.svg" />
            <div class="question-second-div" v-html="questions[currentQuestionIndex].question"></div>
        </div>

        <div class="options-container">
            <button :class="optionClass(option)" v-for="(option) in  questions[currentQuestionIndex].options" :key="option"
                :disabled="questions[currentQuestionIndex].user_answer" v-on:click="radiochoise = option" v-html="option"></button>

        </div>

        <div class="buttons-container">
            <img class="next-icon" @click="nextQuestion" src="../assets/next.svg" style="visibility: hidden;" />
            <button class="submitbutton" @click="submitAnswer">Submit</button>
            <img class="next-icon" @click="nextQuestion" src="../assets/next.svg" />
        </div>

    </div>
    <div v-else>
        <BaseSpinner></BaseSpinner>
    </div>
</template>
<script>
import axios from 'axios';
import BaseSpinner from '../ui/BaseSpinner.vue';
// eslint-disable-next-line
function shuffle(array) {
    let temp = array.map(x => [x, Math.floor(Math.random() * 10000)])
    temp = temp.sort((x, y) => x[1] - y[1])
    return temp.map(x => x[0])
}
// let questions = [
//     {
//         "question": "how old are you1?",
//         "options": ["10", "30", "25", "18"],
//         "answer": "10",
//         "id": "1"
//     },
//     {
//         "question": "how old are you2?",
//         "options": ["10", "30", "25", "18"],
//         "answer": "10",
//         "id": "2"
//     },
//     {
//         "question": "how old are you3?",
//         "options": ["10", "30", "25", "18"],
//         "answer": "10",
//         "id": "3"
//     },
//     {
//         "question": "how old are you4?",
//         "options": ["10", "30", "25", "18"],
//         "answer": "10",
//         "id": "4"
//     },
//     {
//         "question": "how old are you5?",
//         "options": ["10", "30", "25", "18"],
//         "answer": "10",
//         "id": "5"
//     },
//     {
//         "question": "how old are you6?",
//         "options": ["10", "30", "25", "18"],
//         "answer": "10",
//         "id": "6"
//     },
// ]
export default {
    components: {
        BaseSpinner,
    },
    data() {
        this.fetchQuestions()
        return {
            questions: null,
            currentQuestionIndex: 0,
            score: 0,
            radiochoise: null,
            gameIsFinished: null,
        }
    },
    methods: {
        fetchQuestions() {
            axios.get("https://opentdb.com/api.php?amount=10&category=9&type=multiple")
                .then(response => {
                    let questions = []
                    for (const item of response.data.results) {
                        questions.push({
                            "question": item.question,
                            "options": shuffle([...item.incorrect_answers, item.correct_answer]),
                            "answer": item.correct_answer,
                        })
                    }
                    this.questions = questions;
                })
                .catch((e) => e.response.status == 429 ? setTimeout(this.fetchQuestions, 2000) : '')
        },
        optionClass(option) {
            const q = this.questions[this.currentQuestionIndex]
            return {
                'option-btn': true,
                'active': !q.user_answer && option === this.radiochoise,
                'option-btn-correct': q.user_answer && option === q.answer,
                'option-btn-wrong': q.user_answer === option && option != q.answer,
            }
        },
        nextQuestion() {
            this.currentQuestionIndex++;
            this.radiochoise = null;
            if (this.questions.length === this.currentQuestionIndex) {
                this.$emit('game-IsFinishing', this.score);
            }
        },
        getvalue(e) {
            const buttonValue = e.target.value;
            console.log(buttonValue)
        },
        submitAnswer() {
            this.questions[this.currentQuestionIndex].user_answer = this.radiochoise
            if (this.questions[this.currentQuestionIndex].answer === this.radiochoise) {
                this.score++;
            }
            // console.log(this.score)
            // console.log(this.radiochoise, this.questions[this.currentQuestionIndex].answer)
        }

    }
}
</script>

<style lang="scss" scoped>
.screen {
    margin-top: 80px;
    display: flex;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.question-container {
    width: 700px;
    height: 200px;
    border-radius: 10px;
    border-width: 1px;
    background-size: 400% 400%;
    animation: TransitioningBackground 3s ease infinite;
    transition: 0.6s;
    background-image: (linear-gradient(to left, #FDFF8F, #A8ECE7));
    transform: scale(1.1);
    box-shadow: 0px 0px 5px black;
}

// .brainimage {
//     animation: Brainimage 20s ease infinite;
// }

// @keyframes Brainimage {
//     0% {
//         top: -50px;
//         left: -50px;
//     }

//     25% {
//         top: -50px;
//         left: 650px;
//     }

//     50% {
//         top: 150px;
//         left: 650px;
//     }

//     75% {
//         left: -50px;
//         top: 150px;
//     }
//     100% {
//         top: -50px;
//         left: -50px;

//     }

// }

.question-second-div {
    border-color: black;
    font-weight: 10px;
    text-align: center;
    padding-top: 50px;
    font-size: 2rem;
}

.option-btn {
    width: 280px;
    height: 50px;
    border-radius: 10px;
    border-width: 1px;
    margin-top: 44px;
    margin-right: 40px;
    margin-left: 40px;
    font-weight: bold;
    background-color: white;
    opacity: 0.6;
    border-color: black;
}

.option-btn:hover {
    background-image: (linear-gradient(to left, #FDFF8F, #A8ECE7));
    animation: TransitioningBackground 2s ease infinite;
    transition: 0.9s;
    transform: scale(1.1);
    cursor: pointer;
    box-shadow: 0px 0px 5px black;
}

.active {
    background-image: (linear-gradient(to left, #FDFF8F, #A8ECE7));
    border-color: black;
    border-width: 1px;
}

.option-btn-wrong {
    background-color: #ED7E97;
    background-size: 400% 400%;
    animation: TransitioningBackground 2s ease infinite;
    transition: 0.9s;
    transform: scale(1.2);

}

.option-btn-correct {
    background-color: #A8ECE7;
    background-size: 400% 400%;
    animation: TransitioningBackground 2s ease infinite;
    transition: 0.9s;
    transform: scale(1.2);

}

.options-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;

}

.buttons-container {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    width: 700px
}

.submitbutton {
    background: linear-gradient(135deg, #c84f9e, #9d1186);
    border: none;
    border-radius: 30px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    font-weight: bolder;
    cursor: pointer;
    width: 250px;
    animation: TransitioningBackground 1.5s ease infinite;

    &:hover {
        background-size: 400% 400%;
        transition: 0.6s;
        transform: scale(1.1);
    }
}

.next-icon {
    width: 80px;
    height: 80px;
    text-align: right;
}
</style>
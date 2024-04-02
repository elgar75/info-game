<template>
    <div class="screen mt-5 d-flex flex-column align-items-center container" v-if="questions">
        <div class="question-container ">
            <img class="brainimage" style="width: 80px;left: -40px;top: -50px;position: absolute; "
                src="../assets/img copy.svg" />
            <div class="question-second-div  p-3  p-md-4 p-lg-5 fw-bold"
                v-html="questions[currentQuestionIndex].question">
            </div>
        </div>

        <div class="options-container ">
            <button class="p-2 p-md-3 p-lg-4" :class="optionClass(option)"
                v-for="(option) in  questions[currentQuestionIndex].options" :key="option"
                :disabled="questions[currentQuestionIndex].user_answer" v-on:click="radiochoise = option"
                v-html="option"></button>

        </div>
        <div class="row justify-content-center justify-content-evenly mt-5 p-5">
            <div class="row">
                <button :disabled="questions[currentQuestionIndex].user_answer"
                    class="submitbutton button fs-4 px-5 py-3" @click="submitAnswer">Submit</button>
            </div>
            <div class="row mt-2">
                <div v-if="currentQuestionIndex !== 0" class="button me-1 col py-3" @click="backQuestion">
                    <i class="bi bi-arrow-left"></i>
                    Back
                </div>
                <div class="button ms-1 col py-3" @click="nextQuestion">
                    Next
                    <i class="bi bi-arrow-right"></i>
                </div>

            </div>
        </div>
    </div>
    <div v-else>
        <BaseSpinner></BaseSpinner>
    </div>
</template>
<script>
import axios from 'axios';
import BaseSpinner from '../ui/BaseSpinner.vue';

function shuffle(array) {
    let temp = array.map(x => [x, Math.floor(Math.random() * 10000)])
    temp = temp.sort((x, y) => x[1] - y[1])
    return temp.map(x => x[0])
}

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
                const percent = (this.score * 3) / this.questions.length
                this.$emit('game-IsFinishing', { score: this.score, percent: percent });

            }
        },
        backQuestion() {
            if (this.currentQuestionIndex !== 0) {
                this.currentQuestionIndex--;
            }
        },
        submitAnswer() {
            this.questions[this.currentQuestionIndex].user_answer = this.radiochoise
            if (this.questions[this.currentQuestionIndex].answer === this.radiochoise) {
                this.score++;
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.screen {
    background: transparent;
}

.question-container {
    max-width: 60%;
    max-height: 13rem;
    border-radius: 10px;
    border-width: 1px;
    background-size: 400% 400%;
    animation: TransitioningBackground 3s ease infinite;
    transition: 0.6s;
    background-image: (linear-gradient(to left, #FDFF8F, #A8ECE7));
    transform: scale(1.1);
    box-shadow: 0px 0px 5px black;
}

.question-second-div {
    text-align: center;
}

.option-btn {
    border-radius: 10px;
    border-width: 1px;
    margin-top: 44px;
    margin-right: 20px;
    margin-left: 20px;
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
    justify-items: stretch;
    margin-right: 20px;
}

.button {
    background: linear-gradient(135deg, #c84f9e, #9d1186);
    border: none;
    border-radius: 10px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-weight: bolder;
    cursor: pointer;
    animation: TransitioningBackground 1.5s ease infinite;

    &:hover {
        background-size: 400% 400%;
        transition: 0.6s;
        transform: scale(1.1);
    }
}

.button:disabled {
    background: gray
}
</style>
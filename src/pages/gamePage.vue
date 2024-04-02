<template>
  <template v-if="gameState == 'started'">

    <QuestionsList @game-IsFinishing="Finishing"></Questionslist>
  </template>
  <div class="div-container mx-3 mt-lg-5" v-if="gameState == 'finished'">
    <div class="second-container">
      <div style="display: flex; justify-content: center; min-height: 150px;">
        <div class="rating" :style="`--rating-value:${percent};`"></div>
      </div>
      <div class="show-score">
        <p class="Score-p">TOTAL SCORE </p>
        <p class="score">{{ score }}</p>
      </div>
      <div style="display: flex; justify-content: space-around">
        <button class="startagain-button baseButton" @click="resetGame">Start Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionsList from '../components/QuestionsList.vue';

export default {
  components: {
    QuestionsList,
  },

  data() {
    return {
      gameState: 'started',
      rating: null,
    }
  }, methods: {
    showQuestionsList() {
      this.gameState = "started";
    },
    Finishing({ score, percent }) {
      this.gameState = "finished"
      this.score = score
      this.percent = percent
    },
    resetGame() {
      this.$router.push('/')
    }
  },
}
</script>
<style>
.div-container {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  height: 400px;
}

.second-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff68;
  border-radius: 30px;
  width: 500px;
}

.show-score {
  padding-top: 15px;
  box-shadow: inset 1px 2px 5px #777;
  background-color: #E6DCDA;
  width: 50%;
  height: 80px;
  margin-top: 70px;
  border-radius: 60px;
}

.Score-p {
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.score {
  font-size: 1.5rem;
  margin-top: -20px;
  display: flex;
  justify-content: center;
  font-weight: bolder;
  align-items: center;
}

.startagain-button {
  margin-top: 70px;
  text-decoration: none;
}



:root {
  --rating-max: 3;
  --rating-content: '★★★';
  --rating-inactive-color: #CCCCCC;
  --rating-background: #FFDD00;
}

.rating {
  display: inline-block;
  font-size: 80px;
}

.rating::before {
  --rating-percent: calc(var(--rating-value) / var(--rating-max) * 100%);
  content: var(--rating-content);
  background: linear-gradient(90deg, var(--rating-background) var(--rating-percent), var(--rating-inactive-color) var(--rating-percent));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>

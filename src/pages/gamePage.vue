
<template >
  <template v-if="gameState=='started'">
      
      <QuestionsList @game-IsFinishing="Finishing"></Questionslist>
    </template>
    <div class="div-container" v-if="gameState=='finished'" >
      <div class="second-container">
        <div style="display: flex; justify-content: center; min-height: 150px;">
        <img src="../assets/star.svg"  style="width: 100px; align-self:flex-end;" />
        <img src="../assets/star.svg"  style="width: 100px;  "/>
        <img src="../assets/star.svg"  style="width: 100px; align-self:flex-end;"/>
        </div>
          <div class="show-score">
          <p class="Score-p" >TOTAL SCORE </p>
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
    components:{
       QuestionsList,
    } ,   
    
    data(){
        return{
            gameState:'started',
        }
    },methods:{
        showQuestionsList() {
                 this.gameState="started";
        },
        Finishing(score){
              this.gameState="finished"
              this.score=score
            },
            resetGame(){
                // this.gameState='started'
                this.$router.push('/')
            }
    }
    }
</script>
<style>
.div-container{
  display: flex;
  justify-content: center;
  margin-top: 80px;
  height: 400px;
}
.second-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff68;
  border-radius: 30px;
  width: 500px;
}
.show-score{
  padding-top: 15px;
  box-shadow: inset 1px 2px 5px #777;
   background-color: #E6DCDA;  
  width: 50%;
  height: 80px;
  margin-top: 70px;
  border-radius: 60px;
}
.Score-p{
   font-size: 15px;
   font-weight:600;
    display: flex;
    align-items:center;
    justify-content:center;
  }
.score{
  font-size: 1.5rem;
  margin-top:-20px;
  display: flex;
  justify-content:center;
  font-weight: bolder;
  align-items: center;
}
.startagain-button {
  margin-top: 70px;
  text-decoration: none;
}


</style>

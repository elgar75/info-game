<template>
    <div class="template">
    <div class="container" id="landing-page">
        <div class="row" id="nav-bar">
            <div class="col" style="display: flex; align-items: center;">
                <img style="width: 80px;" src="../assets/img copy.svg" />
                <div class="Brain-burst">BrainBurst</div>
            </div>
            <ul class="col" id="topnav">
                <a class="baseButton" href="#home">Home</a>
                <a class="baseButton" href="#news">News</a>
                <a class="baseButton" href="#contact">Contact</a>
                <a class="baseButton" href="#about">About</a>
               
            </ul>   
        </div>
        <div class="row">
            <div id="FAQ-div" class="col">
                <h1 class="FAQ-h">Learning Meets Fun!</h1>
                <p class="FAQ-p" name="v">Embark on an exhilarating journey where learning meets fun, as our quiz website sparks curiosity and fuels your quest for knowledge!</p>
                <button class="baseButton start-button"  @click="showQuestions">Let's Start</button>
            </div>
            <div class="col">
                <img class="landing-Image" src="../assets/img.svg" />
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                gameState:"not_started",  
                score:0    
            }
        },
        methods:{
            showQuestions() {
                 this.$router.push('/game')

            },
           
        }
    }
</script>
<style lang="scss">
.Brain-burst{
    font-size: 18px;
    font-weight: bolder;
 }
#nav-bar{
    align-items: center;
}
#topnav a{
    margin-left: 40px;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  border-radius: 10px;
}
.start-button{
    margin-top:50px;
    background-color: white;
    opacity: 0.6;
    
}
.landing-Image{
    margin-top: 50px;
    margin-left:100px ;
    width: 500px;
    height: 500px;
}
#landing-page{
    display: grid;
    grid-template-columns:2;  
}
#FAQ-div{
    padding-top: 100px;
}
.FAQ-h{
    font-size: 70px;
}
.FAQ-p{
    margin-top: 50px;
    font-size:20px;
}


</style>
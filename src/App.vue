<template>
  <router-view></router-view>
</template>

<script>



export default {

}
</script>

<style lang="scss">
body{
    background-color: transparent !important;
  
}
html{
  color: black;
    height: 100%;
    background-repeat:no-repeat;
    background-size: cover;
    background: linear-gradient(135deg, #ED7E97,#ecc9d2,#FDFF8F, #A8ECE7 );
}
@keyframes TransitioningBackground {
  0% {
    background-position: 1% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 1% 0%;
  }
}
.baseButton  {
  font-size: 1rem;
  font-weight: 600;
  color: black;
  text-align: center;
  width: 200px;
  height: 60px;
  border-width: 0;
  border-radius: 15px;
  background-size: 400% 400%;
  animation: TransitioningBackground 1.5s ease infinite;
  transition: 0.6s;
  &:hover {
    background-image: (linear-gradient(to left, #FDFF8F, #A8ECE7));
    transform: scale(1.1);
    box-shadow: 0px 0px 5px black;
    cursor: pointer;
  }
}
@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
</style>

<template>
    <div class="template">
        <div class="container" id="landing-page">
            <div class="row" id="nav-bar">
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <img style="width: 80px;" src="../assets/img copy.svg" />
                        <div class="Brain-burst">BrainBurst</div>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style="flex-direction: row-reverse">
                            <div class="navbar-nav">
                                <a class="nav-link baseButton " style="width:100px; height: 50px;" aria-current="page"
                                    href="#">Home</a>
                                <a class="nav-link baseButton" style="width:100px; height: 50px;" href="#">News</a>
                                <a class="nav-link baseButton" style="width:100px; height: 50px;" href="#">Contact</a>
                                <a class="nav-link baseButton" style="width:100px; height: 50px;" href="#">About Me</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="row">
                <div class="col col-12 col-sm-6">
                    <h1 class="fs-1 pt-5 ">Learning Meets Fun!</h1>
                    <p class="fs-4 mt-4" name="v">Embark on an exhilarating journey where learning meets fun, as our quiz
                        website sparks curiosity and fuels your quest for knowledge!</p>
                </div>
                <div class="col col-8 col-sm-5 mx-auto align-self-center">
                    <img class="img-fluid" src="../assets/img.svg" />
                </div>
            </div>
            <div class="row justify-content-center justify-content-sm-start">
                <button class="baseButton start-button" @click="showQuestions">Let's Start</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            gameState: "not_started",
            score: 0
        }
    },
    methods: {
        showQuestions() {
            this.$router.push('/game')

        },

    }
}
</script>
<style>
.Brain-burst {
    font-size: 18px;
    font-weight: bolder;
}

#nav-bar {
    align-items: center;
}

#topnav a {
    margin-left: 30px;
    text-decoration: none;
    border-radius: 10px;
}

.start-button {
    background-color: white;
    opacity: 0.6;
    max-width: 200px;
}
</style>
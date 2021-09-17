window.onload = function() {

    let element = document.querySelector("#canvas");
    let ctx = canvas.getContext('2d');

    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;

    canvas.style.backgroundColor = "#2d3436";

    let mouse = {
        x: undefined,
        y: undefined
    };

    window.addEventListener('click', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;

        initParticles();
        initCircle();
    });


    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomColor() {
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    let colorArray = [
        "#016699",
        "#99CCCC",
        "#FF2105",
    ];


    function circlePath(radCircle, colorCircle, circlePosX, circlePosY, opacityCircle, depRadCircle) {
        this.radCircle = radCircle;
        this.colorCircle = colorCircle;
        this.circlePosX = circlePosX;
        this.circlePosY = circlePosY;
        this.opacityCircle = opacityCircle;
        this.depRadCircle = depRadCircle;
        depOpacityCircle = 0.03;

        this.drawCircle = function() {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(228, 229, 230, "+ this.opacityCircle +")";
            ctx.arc(this.circlePosX, this.circlePosY, this.radCircle, 0, Math.PI*2);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.fillOpacity = this.opacityCircle;
            ctx.closePath();
        }

        this.updateCircle = function() {

            this.radCircle += this.depRadCircle;
            this.opacityCircle -= depOpacityCircle;

            this.drawCircle();
        }

    }

    function particlesPath(radParticles, colorParticles, particlesPosX, particlesPosY, opacityParticles, particlesDepX, particlesDepY, depRadParticles) {
        this.radParticles = radParticles;
        this.colorParticles = colorParticles;
        this.particlesPosX = particlesPosX;
        this.particlesPosY = particlesPosY;
        this.opacityParticles = opacityParticles;
        this.particlesDepX = particlesDepX;
        this.particlesDepY = particlesDepY;
        this.depRadParticles = depRadParticles;
        counter = this.radParticles

        this.drawParticles = function() {
            ctx.beginPath();
            ctx.fillStyle = this.colorParticles;
            ctx.arc(this.particlesPosX, this.particlesPosY, this.radParticles, 0, Math.PI*2);
            ctx.fill();
            ctx.fillOpacity = this.opacityParticles;
            ctx.closePath();
        }

        this.updateParticles = function() {

            if(this.radParticles < this.depRadParticles){
                this.depRadParticles = 0;
                this.radParticles = 0;
            }

            this.particlesPosX += this.particlesDepX;
            this.particlesPosY += this.particlesDepY;
            this.radParticles -= this.depRadParticles;
            console.log(this.radParticles);

            this.drawParticles();
        }
    }

    let circleArray;
    function initCircle() {
        circleArray = [];
        for(let i = 0; i < 1; i++){
            let radCircle = 20;
            let opacityCircle = 1;
            let colorCircle = "#FF0000";
            let circlePosX = mouse.x;
            let circlePosY = mouse.y;
            let depRadCircle = 2;

            circleArray.push(new circlePath(radCircle, colorCircle, circlePosX, circlePosY, opacityCircle, depRadCircle));
        }
    }



    let particlesArray;
    function initParticles() {
        particlesArray = [];
        for(let i = 0; i < 30; i++){
            let radParticles = getRandomNumber(15, 25);
            let opacityParticles = 1;
            let colorParticles = getRandomColor(colorArray);
            let particlesPosX = mouse.x;
            let particlesPosY = mouse.y;
            let particlesDepX = getRandomNumber(-5, 5);
            let particlesDepY = getRandomNumber(-5, 5);
            let depRadParticles = 0.5;

            particlesArray.push(new particlesPath(radParticles, colorParticles,                                                       particlesPosX, particlesPosY,                                                       opacityParticles, particlesDepX,                                                   particlesDepY, depRadParticles));
        }
    }



    setInterval(animate, 20);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < particlesArray.length; i++) {
            particlesArray[i].updateParticles();
        }

        for(var i = 0; i < circleArray.length; i++) {
            circleArray[i].updateCircle();
        }

    }

}

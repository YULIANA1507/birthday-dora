// =============================
// PAGE NAVIGATION
// =============================

let currentPage = 0;
const pages = document.querySelectorAll(".page");

function showPage(index){

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    pages[index].classList.add("active");

}

function nextPage(){

    currentPage++;

    if(currentPage < pages.length){

        showPage(currentPage);

    }

}

// =============================
// COUNTDOWN
// =============================

function startCountdown(){

    currentPage++;

    showPage(currentPage);

    const count = document.getElementById("count");

    let number = 3;

    count.innerHTML = number;

    const timer = setInterval(()=>{

        number--;

        if(number > 0){

            count.innerHTML = number;

        }else{

            clearInterval(timer);

            count.innerHTML = "🎉";

            setTimeout(()=>{

                currentPage++;

                showPage(currentPage);

                // Play Music
                const music = document.getElementById("music");

                music.volume = 0.6;

                music.play().catch(()=>{});

                launchConfetti();

                startHearts();

            },900);

        }

    },1000);

}

// =============================
// CONFETTI
// =============================

function launchConfetti(){

    const duration = 4000;

    const end = Date.now() + duration;

    (function frame(){

        confetti({

            particleCount:5,

            angle:60,

            spread:70,

            origin:{x:0}

        });

        confetti({

            particleCount:5,

            angle:120,

            spread:70,

            origin:{x:1}

        });

        if(Date.now() < end){

            requestAnimationFrame(frame);

        }

    })();

}

// =============================
// SAKURA
// =============================

const sakuraContainer = document.getElementById("sakura-container");

function createSakura(){

    const flower = document.createElement("div");

    flower.className = "sakura";

    flower.innerHTML = "🌸";

    flower.style.left = Math.random()*100 + "vw";

    flower.style.fontSize = (18 + Math.random()*18) + "px";

    flower.style.animationDuration = (7 + Math.random()*5) + "s";

    flower.style.opacity = 0.5 + Math.random()*0.5;

    sakuraContainer.appendChild(flower);

    setTimeout(()=>{

        flower.remove();

    },12000);

}

setInterval(createSakura,350);

// =============================
// HEART ANIMATION
// =============================

function startHearts(){

    setInterval(()=>{

        const heart = document.createElement("div");

        heart.innerHTML = "💖";

        heart.style.position = "fixed";

        heart.style.left = Math.random()*100 + "vw";

        heart.style.bottom = "-40px";

        heart.style.fontSize = (18 + Math.random()*20) + "px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "999";

        heart.style.transition = "all 6s linear";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.style.transform = "translateY(-110vh) rotate(360deg)";
            heart.style.opacity = "0";

        },50);

        setTimeout(()=>{

            heart.remove();

        },6000);

    },700);

}
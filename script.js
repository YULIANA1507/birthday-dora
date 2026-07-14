// ==========================
// PAGE NAVIGATION
// ==========================

let currentPage = 0;
const pages = document.querySelectorAll(".page");
const music = document.getElementById("music");

function showPage(index){

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    if(index < pages.length){
        pages[index].classList.add("active");
    }

}

function nextPage(){

    currentPage++;

    if(currentPage < pages.length){
        showPage(currentPage);
    }

}

// ==========================
// COUNTDOWN
// ==========================

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

                playMusic();

                launchConfetti();

                startHearts();

            },1000);

        }

    },1000);

}

// ==========================
// PLAY MUSIC
// ==========================

function playMusic(){

    music.volume = 0.7;

    music.currentTime = 0;

    const playPromise = music.play();

    if(playPromise !== undefined){

        playPromise
        .then(()=>{

            console.log("Music Playing");

        })
        .catch((error)=>{

            console.log(error);

            // Browser memblokir autoplay
            createMusicButton();

        });

    }

}

// ==========================
// Jika autoplay gagal
// ==========================

function createMusicButton(){

    if(document.getElementById("musicButton")) return;

    const btn = document.createElement("button");

    btn.id = "musicButton";

    btn.innerHTML = "🎵 Klik untuk Memutar Musik";

    btn.style.position="fixed";
    btn.style.bottom="20px";
    btn.style.right="20px";
    btn.style.zIndex="9999";

    btn.onclick=()=>{

        music.play();

        btn.remove();

    }

    document.body.appendChild(btn);

}

// ==========================
// CONFETTI
// ==========================

function launchConfetti(){

    const duration = 5000;

    const end = Date.now() + duration;

    (function frame(){

        confetti({

            particleCount:6,

            angle:60,

            spread:80,

            origin:{x:0}

        });

        confetti({

            particleCount:6,

            angle:120,

            spread:80,

            origin:{x:1}

        });

        if(Date.now() < end){

            requestAnimationFrame(frame);

        }

    })();

}

// ==========================
// SAKURA
// ==========================

const sakuraContainer = document.getElementById("sakura-container");

function createSakura(){

    const flower = document.createElement("div");

    flower.className="sakura";

    flower.innerHTML="🌸";

    flower.style.left=Math.random()*100+"vw";

    flower.style.fontSize=(18+Math.random()*18)+"px";

    flower.style.animationDuration=(8+Math.random()*5)+"s";

    flower.style.opacity=0.4+Math.random()*0.6;

    sakuraContainer.appendChild(flower);

    setTimeout(()=>{

        flower.remove();

    },13000);

}

setInterval(createSakura,300);

// ==========================
// HEARTS
// ==========================

let heartInterval;

function startHearts(){

    if(heartInterval) return;

    heartInterval = setInterval(()=>{

        const heart=document.createElement("div");

        heart.innerHTML="💖";

        heart.style.position="fixed";

        heart.style.left=Math.random()*100+"vw";

        heart.style.bottom="-30px";

        heart.style.fontSize=(20+Math.random()*20)+"px";

        heart.style.pointerEvents="none";

        heart.style.transition="all 6s linear";

        heart.style.zIndex="999";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.style.transform="translateY(-110vh) rotate(360deg)";

            heart.style.opacity="0";

        },50);

        setTimeout(()=>{

            heart.remove();

        },6000);

    },500);

}

// ==========================
// TEST MUSIC
// ==========================

window.addEventListener("keydown",(e)=>{

    if(e.key==="m"){

        playMusic();

    }

});

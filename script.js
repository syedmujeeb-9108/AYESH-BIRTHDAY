/* =========================================
   AYESH — OUR LITTLE UNIVERSE
   Interactive Experience
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
       ========================================= */

    const enterButton = document.getElementById("enterButton");
    const openingScreen = document.getElementById("openingScreen");
    const mainWebsite = document.getElementById("mainWebsite");

    const musicButton = document.getElementById("musicButton");
    const backgroundMusic = document.getElementById("backgroundMusic");

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const starMessage = document.getElementById("starMessage");

    const giftButton = document.getElementById("giftButton");


    /* =========================================
       OPEN WEBSITE
       ========================================= */

    enterButton.addEventListener("click", () => {

        openingScreen.style.transition =
            "opacity 1s ease, transform 1s ease";

        openingScreen.style.opacity = "0";
        openingScreen.style.transform = "scale(1.03)";

        setTimeout(() => {

            openingScreen.style.display = "none";

            mainWebsite.classList.add("active");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            startMusic();

        }, 1000);

    });


    /* =========================================
       MUSIC
       ========================================= */

    let musicPlaying = false;


    function startMusic() {

        backgroundMusic.volume = 0.35;

        backgroundMusic
            .play()
            .then(() => {

                musicPlaying = true;

                musicButton.classList.add("playing");

                musicButton.textContent = "♫";

            })
            .catch(() => {

                /*
                    Some browsers may still block audio.
                    The user can press the music button manually.
                */

                musicPlaying = false;

            });

    }


    musicButton.addEventListener("click", () => {

        if (musicPlaying) {

            backgroundMusic.pause();

            musicPlaying = false;

            musicButton.classList.remove("playing");

            musicButton.textContent = "♫";

        } else {

            backgroundMusic
                .play()
                .then(() => {

                    musicPlaying = true;

                    musicButton.classList.add("playing");

                    musicButton.textContent = "♫";

                })
                .catch(() => {

                    alert(
                        "Please add your music file inside assets/music/"
                    );

                });

        }

    });


    /* =========================================
       BIRTHDAY COUNTDOWN
       ========================================= */

    function getNextBirthday() {

        const now = new Date();

        let birthday = new Date(
            now.getFullYear(),
            9,
            4,
            0,
            0,
            0
        );

        /*
            October = month 9 in JavaScript.
        */

        if (now > birthday) {

            birthday = new Date(
                now.getFullYear() + 1,
                9,
                4,
                0,
                0,
                0
            );

        }

        return birthday;

    }


    function updateCountdown() {

        const now = new Date();

        const birthday = getNextBirthday();

        const difference =
            birthday.getTime() - now.getTime();


        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;

        }


        const totalSeconds =
            Math.floor(difference / 1000);


        const days =
            Math.floor(totalSeconds / 86400);


        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const seconds =
            totalSeconds % 60;


        daysElement.textContent =
            String(days).padStart(2, "0");


        hoursElement.textContent =
            String(hours).padStart(2, "0");


        minutesElement.textContent =
            String(minutes).padStart(2, "0");


        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


  /* =========================================
   UNIVERSE STARS
   ========================================= */

const starButtons = document.querySelectorAll(".star");

const starMessages = [
    "You became one of the brightest stars in my universe. ❤️",
    "Some memories never fade. They become part of who we are. ✨",
    "If I could relive one moment, I'd choose another moment with you. 🌙",
    "The best chapter of my life started on 21 October 2022. 💗",
    "No matter how big the universe gets, you'll always have a place in mine. ∞"
];

starButtons.forEach((star, index) => {
    star.addEventListener("click", function () {

        starMessage.style.opacity = "0";

        setTimeout(() => {
            starMessage.innerHTML = `
                <p>${starMessages[index]}</p>
            `;

            starMessage.style.opacity = "1";
        }, 200);

    });
});

    /* =========================================
       QUIZ
       ========================================= */

    const questionNumber =
        document.getElementById("questionNumber");

    const question =
        document.getElementById("question");

    const answers =
        document.getElementById("answers");

    const quizResult =
        document.getElementById("quizResult");


    const quizQuestions = [

        {
            question:
                "Where did we first meet?",

            answers: [
                "At a restaurant",
                "Near the Indoor Stadium",
                "At a movie theatre"
            ],

            correct: 1
        },


        {
            question:
                "When did our story officially begin?",

            answers: [
                "21 October 2022",
                "4 October 2022",
                "14 February 2023"
            ],

            correct: 0
        },


        {
            question:
                "What is something I love about you?",

            answers: [
                "Your loyalty",
                "Your caring nature",
                "The way you understand me",

            ],

            correct: -1

        }

    ];


    let currentQuestion = 0;

    let quizScore = 0;


    function loadQuestion() {

        const current =
            quizQuestions[currentQuestion];


        questionNumber.textContent =
            `QUESTION ${currentQuestion + 1} OF ${quizQuestions.length}`;


        question.textContent =
            current.question;


        answers.innerHTML = "";


        current.answers.forEach(
            (answerText, index) => {

                const button =
                    document.createElement("button");


                button.textContent =
                    answerText;


                button.addEventListener(
                    "click",
                    () => {

                        if (
                            current.correct === -1 ||
                            index === current.correct
                        ) {

                            quizScore++;

                            quizResult.textContent =
                                "Correct ❤️";

                        } else {

                            quizResult.textContent =
                                "Almost! But I still love you ❤️";

                        }


                        setTimeout(() => {

                            currentQuestion++;


                            if (
                                currentQuestion <
                                quizQuestions.length
                            ) {

                                quizResult.textContent = "";

                                loadQuestion();

                            } else {

                                finishQuiz();

                            }

                        }, 900);

                    }
                );


                answers.appendChild(button);

            }
        );

    }


    function finishQuiz() {

        questionNumber.textContent =
            "QUIZ COMPLETE ❤️";


        question.textContent =
            `You scored ${quizScore} / ${quizQuestions.length}`;


        answers.innerHTML = "";


        quizResult.textContent =
            "But honestly, you already won my heart. ∞";

    }


    loadQuestion();


    /* =========================================
       GIFT
       ========================================= */

    giftButton.addEventListener("click", () => {

        createConfetti();

        setTimeout(() => {

            document.getElementById("letter")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 1000);

    });


    /* =========================================
       CONFETTI
       ========================================= */

    function createConfetti() {

        const symbols = [
            "♥",
            "✦",
            "✧",
            "♡",
            "✿"
        ];


        for (let i = 0; i < 80; i++) {

            const confetti =
                document.createElement("div");


            confetti.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];


            confetti.style.position =
                "fixed";


            confetti.style.left =
                Math.random() * 100 + "vw";


            confetti.style.top =
                "-30px";


            confetti.style.fontSize =
                Math.random() * 15 + 10 + "px";


            confetti.style.color =
                Math.random() > 0.5
                    ? "#d7b56d"
                    : "#df8ca0";


            confetti.style.zIndex =
                "9999";


            confetti.style.pointerEvents =
                "none";


            document.body.appendChild(confetti);


            const duration =
                Math.random() * 2500 + 2000;


            const horizontal =
                (Math.random() - 0.5) * 300;


            confetti.animate(

                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",

                        opacity: 1
                    },

                    {
                        transform:
                            `translate(${horizontal}px, 110vh) rotate(720deg)`,

                        opacity: 0
                    }
                ],

                {
                    duration: duration,

                    easing: "cubic-bezier(.2,.8,.3,1)"
                }

            );


            setTimeout(() => {

                confetti.remove();

            }, duration);

        }

    }


    /* =========================================
       NAVIGATION ACTIVE EFFECT
       ========================================= */

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigationLinks.forEach(
                item => item.style.color = ""
            );

            link.style.color =
                "#f1d99b";

        });

    });


    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".timeline-card, .reason-card, .quiz-card, .letter-card"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        revealObserver.observe(element);

    });


    /* =========================================
       CONSOLE MESSAGE
       ========================================= */

    console.log(
        "%c❤️ AYESH — OUR LITTLE UNIVERSE",
        "font-size:20px;color:#df8ca0;font-weight:bold;"
    );

    console.log(
        "%cMade with love by Syed Mujeeb Rahman.",
        "font-size:12px;color:#d7b56d;"
    );

});
/* =========================================================
   MOMENTS WITH AYESH — FULL PHOTO GALLERY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const openGallery = document.getElementById("openGallery");
    const closeGallery = document.getElementById("closeGallery");
    const galleryModal = document.getElementById("galleryModal");
    const galleryGrid = document.getElementById("galleryGrid");

    if (!openGallery || !closeGallery || !galleryModal || !galleryGrid) {
        return;
    }

    /* All uploaded photos */

    const photos = [
        "IMG_20240221_164619.jpg",
        "IMG_20250403_154103.jpg",
        "IMG_20240722_210705_071.jpg",
        "IMG-20240814-WA0013.jpg",
        "IMG_20240722_210843_709.jpg",
        "Snapchat-116516891.jpg",
        "Snapchat-500564056.jpg",
        "Snapchat-662927580.jpg",
        "Snapchat-1070970626.jpg",
        "Snapchat-1300785162.jpg",
        "Snapchat-1521131098.jpg",
        "Snapchat-1526751676.jpg",
        "Snapchat-1742995122.jpg",
        "Snapchat-1953691446.jpg",
        "Snapchat-1983423998.jpg",
        "Snapchat-866384687.jpg",
        "Snapchat-918684780.jpg"
    ];

    /* Create gallery */

    photos.forEach((photo, index) => {

        const item = document.createElement("div");

        item.className = "gallery-item";

        const image = document.createElement("img");

        image.src = `assets/images/${photo}`;
        image.alt = `Memory with Ayesh ${index + 1}`;
        image.loading = "lazy";

        item.appendChild(image);

        galleryGrid.appendChild(item);
    });

    /* Open gallery */

    openGallery.addEventListener("click", () => {

        galleryModal.classList.add("active");

        document.body.style.overflow = "hidden";
    });

    /* Close gallery */

    closeGallery.addEventListener("click", () => {

        galleryModal.classList.remove("active");

        document.body.style.overflow = "";
    });

    /* Close when clicking outside the gallery content */

    galleryModal.addEventListener("click", (event) => {

        if (event.target === galleryModal) {

            galleryModal.classList.remove("active");

            document.body.style.overflow = "";
        }
    });

    /* ESC key closes gallery */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            galleryModal.classList.remove("active");

            document.body.style.overflow = "";
        }
    });

});
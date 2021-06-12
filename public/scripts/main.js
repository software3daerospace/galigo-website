// DOM ELEMENTS
const headerBar = document.querySelector(".header-bar");
const headerOverlay = document.querySelector(".header-bar__overlay");
const navigationCheckbox = document.querySelector(".header-bar__navigation-checkbox");
const phoneScreens = document.querySelectorAll(".phone-slider__screen");
const problemButtons = document.querySelectorAll(".problem-slider__button");
const problemDots = document.querySelectorAll(".problem-slider__dot");
const problemText = document.querySelector(".problems-section__text");
const problemTitle = document.querySelector(".problems-section__title");
const problemDescription = document.querySelector(".problems-section__description");
const solutionInputs = document.querySelectorAll(".solution-illustration__input");
const solutionButtons = document.querySelectorAll(".solution-illustration__icon--service");
const solutionText = document.querySelector(".solutions-section__text");
const solutionTitle = document.querySelector(".solutions-section__title");
const solutionDescription = document.querySelector(".solutions-section__description");
const newsletterForm = document.querySelector(".contact-section__form");
const newsletterName = document.querySelector(".contact-section__input--name");
const newsletterEmail = document.querySelector(".contact-section__input--email");
const newsLetterError = document.querySelector(".contact-section__error");
const teamCategories = document.querySelectorAll(".team-slider__input");
const teamMembers = document.querySelectorAll(".team-slider__person");


// CONTENT ARRAYS

const problemsContent = [{
        title: "Slow Traffic Updates",
        text: "One of the main causes for traffic congestion is poor anticipation. As it stands today, by the time traffic congestion is detected and communicated to road users, the situation has more often than not already aggravated."
    },
    {
        title: "Undetected Road Anomalies",
        text: "Roadworks, accidents, and deviations happen to be a part of urban mobility. And while they may sometimes be inevitable, we should certainly strive to manage them with more reactive, efficient, and secure methods."
    },
    {
        title: "Traffic Congestion",
        text: "We've all been stuck in a line of cars that stretches into the horizon at some point. To this day, traffic congestion causes major issues related to mental health, time efficiency, and economic productivity."
    },
    {
        title: "Unreliable Public Transport",
        text: "One of the greatest assets of urban cities is ironically also a major source of frustration. Many of us are dependent on public transport, and its service quality and timeliness still leave a lot to be desired."
    },
    {
        title: "Inefficient Delivery Services",
        text: "In an economy where virtually everything can be purchased through a screen, we need to find a better way to get online orders from store to door, for the benefit of consumers, sellers, and carriers alike."
    },
    {
        title: "Excess Fuel Consumption",
        text: "There are only so many natural resources available to us, and we are racing towards a depletion of our raw materials. Urban traffic in particular can't sustain its current fuel consumption for much longer."
    },
    {
        title: "Increased Pollution",
        text: "Our planet is the most valuable thing we have, yet we don't treat it as such. In urban cities more than anywhere else, it's about time that we start making a real effort to reduce our greenhouse gas emissions."
    },
];

const solutionsContent = [{
        title: "Road Anomaly Detection",
        text: "Using the latest geolocation technology and complex image recognition algorithms, GaliGo automatically detects and locates road anomalies such as holes in the road, accidents, and roadworks."
    },
    {
        title: "Traffic Signal Analysis",
        text: "Traffic congestion issues tends to occur repeatedly in the same areas, which is why GaliGo uses its AI-powered technology to identify miscoordination between traffic signals in urban communities along with possible improvements."
    },
    {
        title: "Smart Itinerary Planning",
        text: "We all share the same roads to get from point A to point B, and GaliGo takes this into account in a real-time navigation system that considers all road users in order to propose itineraries that them to their destination via the fastest and most efficient route."
    },
    {
        title: "Real-time Traffic Updates",
        text: "Unexpected things happen on the road, and while GaliGo can't promise to eliminate them entirely, it sure can offer to identify and communicate them faster and more accurately than it has ever been done before."
    },
    {
        title: "Public Transport Tracking",
        text: "GaliGo's technology is, among other things, deployed on public transport vehicles, thus allowing users to know exactly where their next bus is at this very moment and when it will reach them at their stop."
    },
    {
        title: "Delivery Tracking",
        text: "With GaliGo, the days of missing deliveries due to unpunctual carriers or impractical schedules are over: Users can now know well in advance when they can expect their online orders to be delivered and can follow them throughout the entire delivery process."
    }
];


// EVENT LISTENERS

navigationCheckbox.addEventListener("change", () => {
    headerOverlay.classList.toggle("header-bar__overlay--active");
    headerBar.classList.toggle("header-bar--active");
});

problemButtons.forEach(b => {
    b.addEventListener("click", () => {
        problemButtons.forEach(b => b.classList.add("unclickable"));
        clearInterval(problemsAuto);
        const activeProblem = document.querySelector(".problem-slider__image--active");
        const activeNumber = parseClassNumber(activeProblem);
        let nextNumber = activeNumber + 1;
        if (b.classList.contains("problem-slider__button--left")) {
            nextNumber = activeNumber - 1;
        }
        nextNumber = checkIndex(nextNumber, problemsContent);
        changeProblem(activeProblem, nextNumber);
        setTimeout(() => {
            problemButtons.forEach(b => b.classList.remove("unclickable"));
        }, 1000);
    });
});

problemDots.forEach(d => {
    d.addEventListener("click", () => {
        clearInterval(problemsAuto);
        if (d.classList.contains("problem-slider__dot--active")) {
            return
        } else {
            const activeProblem = document.querySelector(".problem-slider__image--active");
            const activeNumber = parseClassNumber(d);
            changeProblem(activeProblem, activeNumber);
        }
    });
});

solutionInputs.forEach(input => {
    input.addEventListener("change", () => {
        const activeSolution = document.querySelector(".solution-illustration__input:checked");
        const number = Number(input.value);
        changeSolution(number);
    });
});

solutionButtons.forEach(button => {
    button.addEventListener("click", () => {
        clearInterval(solutionsAuto);
    });
});

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
        const isValid = validateNewsletterForm();
        if (!isValid) {
            e.preventDefault();
        }
    });

    [newsletterName, newsletterEmail].forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove("contact-section__input--error");
        });
    });
};

teamCategories.forEach(c => c.addEventListener("change", () => {
    const category = c.value;
    changeTeam(category);
}));

// AUTOMATIC INTERVALS

// const screensAuto = setInterval(() => {
//     slideScreen();
// }, 5000);

// const problemsAuto = setInterval(() => {
//     const activeProblem = document.querySelector(".problem-slider__image--active");
//     const activeNumber = Number(activeProblem.classList.value.replace(/[^0-9]/g, ''));
//     let nextNumber = activeNumber + 1;
//     nextNumber = checkIndex(nextNumber, problemsContent);
//     changeProblem(activeProblem, nextNumber);
// }, 7500);

// const solutionsAuto = setInterval(() => {
//     const activeSolution = document.querySelector(".solution-illustration__input:checked");
//     const number = Number(activeSolution.value);
//     let nextNumber = number + 1;
//     nextNumber = checkIndex(nextNumber, solutionsContent);
//     const nextSolution = document.querySelector(`#service${nextNumber}`);
//     activeSolution.checked = false;
//     nextSolution.checked = true;
//     changeSolution(nextNumber);
// }, 7500);


// DOM MANIPULATION FUNCTIONS

const slideScreen = () => {
    const activeScreen = document.querySelector(".phone-slider__screen--active");
    const activeNumber = Number(activeScreen.classList.value.replace(/[^0-9]/g, ''));
    const totalPhoneScreens = phoneScreens.length;
    let nextNumber = activeNumber + 1;
    if (nextNumber > totalPhoneScreens) {
        nextNumber = 1;
    }
    const nextScreen = document.querySelector(`.phone-slider__screen--${nextNumber}`);
    activeScreen.classList.replace("phone-slider__screen--active", "phone-slider__screen--exit");
    nextScreen.classList.add("phone-slider__screen--active");
    setTimeout(() => {
        activeScreen.classList.remove("phone-slider__screen--exit")
    }, 750);
}

const changeProblem = (image, number) => {
    const activeDot = document.querySelector(".problem-slider__dot--active");
    const nextDot = document.querySelector(`.problem-slider__dot--${number}`);
    const nextProblem = document.querySelector(`.problem-slider__image--${number}`);
    activeDot.classList.remove("problem-slider__dot--active");
    nextDot.classList.add("problem-slider__dot--active");
    image.classList.remove("problem-slider__image--active");
    nextProblem.classList.add("problem-slider__image--active");
    const oldHeight = problemText.scrollHeight;
    problemText.style.height = oldHeight + "px";
    problemText.style.opacity = 0;
    // const oldDescriptionHeight = problemDescription.scrollHeight;
    // const oldTitleHeight = problemTitle.scrollHeight;
    setTimeout(() => {
        problemTitle.innerHTML = problemsContent[number - 1].title;
        problemDescription.innerHTML = problemsContent[number - 1].text;
        const newDescriptionHeight = problemDescription.scrollHeight;
        const newTitleHeight = problemTitle.scrollHeight;
        const newHeight = newTitleHeight + newDescriptionHeight;
        problemText.style.height = newHeight + "px";
        problemText.style.opacity = 1;
    }, 500);
};

const changeSolution = number => {
    const oldHeight = solutionText.scrollHeight;
    solutionText.style.height = oldHeight + "px";
    solutionText.style.opacity = 0;
    setTimeout(() => {
        solutionTitle.innerHTML = solutionsContent[number - 1].title;
        solutionDescription.innerHTML = solutionsContent[number - 1].text;
        const newDescriptionHeight = solutionDescription.scrollHeight;
        const newTitleHeight = solutionTitle.scrollHeight;
        const newHeight = newTitleHeight + newDescriptionHeight;
        solutionText.style.height = newHeight + "px";
        solutionText.style.opacity = 1;
    }, 500);
};

const validateNewsletterForm = () => {
    if (newsletterName.value === "") {
        newsletterName.classList.add("contact-section__input--error");
    }
    if (newsletterEmail.value === "" || !newsletterEmail.value.match(/\S+@\S+\.\S+/)) {
        newsletterEmail.classList.add("contact-section__input--error");
    }
    if (newsletterName.value === "" || newsletterEmail.value === "" || !newsletterEmail.value.match(/\S+@\S+\.\S+/)) {
        return false;
    } else {
        return true;
    };
};

const changeTeam = (category) => {
    const active = document.querySelectorAll(".team-slider__person--active");
    const nextMembers = () => {
        if (category === "all") {
            return teamMembers;
        } else {
            return document.querySelectorAll(`.team-slider__person--${category}`);
        }
    }
    const next = nextMembers();
    document.querySelectorAll(`.team-slider__person--${category}`);
    for (let person of active) {
        person.classList.replace("team-slider__person--active", "team-slider__person--previous");
        setTimeout(() => {
            person.classList.add("team-slider__person--active", "team-slider__person--hidden");
        }, 250);
    }
    setTimeout(() => {
        for (let person of next) {
            person.classList.remove("team-slider__person--previous", "team-slider__person--hidden");
            person.classList.add("team-slider__person--next");
            setTimeout(() => {
                person.classList.replace("team-slider__person--next", "team-slider__person--active");
            }, 250);
        }
    }, 250);
}


// UTILITY FUNCTIONS

const checkIndex = (number, array) => {
    if (number > array.length) {
        number = 1;
    } else if (!number) {
        number = array.length;
    }
    return number;
}

const parseClassNumber = element => {
    return Number(element.classList.value.replace(/[^0-9]/g, ''));
}

const tryCode = (f) => {
    try { f } catch { return };
}
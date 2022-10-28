const section = document.querySelector("section");
const playerLivesCounts = document.querySelector("span")
let playerLives = 8;

playerLivesCounts.textContent = playerLives;

const getData = () => [
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_1.svg", name: "One" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_2.svg", name: "Two" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_3.svg", name: "Three" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_4.svg", name: "Four" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_5.svg", name: "Five" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_6.svg", name: "Six" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_7.svg", name: "Seven" },    
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_8.svg", name: "Eight" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_9.svg", name: "Nine" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_10.svg", name: "Ten" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_11.svg", name: "Eleven" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_12.svg", name: "Tvelve" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_13.svg", name: "Therteen" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_14.svg", name: "Fourteen" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_15.svg", name: "Fiveteen" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_16.svg", name: "Sixteen" },
    {imgSrc: "./Assets/Images/TheGlobalGoals_Icons_Color_Goal_17.svg", name: "Seventeen" },
];

const randomize = () => {
    var cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    cardData = cardData.filter((cardData,numberOfCards) => numberOfCards < 8)
    cardData = cardData.concat(cardData)
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};


//Generate cards----------------------------------------------------------------
const cardGenerator = () => {
    const cardData = randomize();
    //html
    cardData.forEach((item) => {    
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards----------------------------------------------------------------
    face.src = item.imgSrc;
    card.setAttribute("name", item.name)
    //Attach the cards to the section----------------------------------------------------------------
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back)

    card.addEventListener("click", (e) => {
        card.classList.toggle("toggleCard")
        checkCards(e)
    });
    });
};

//Timer----------------------------------------------------------------
let min = 0;
let sec = 0;
function myTimer() {
  document.getElementById("timer").innerHTML = "Time: " + min + " Minutes " + sec + " Seconds";
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
  }
}
var timer
document.addEventListener('click', () => {
    timer = setInterval(myTimer, 1000);  
}, { once: true });

//Antal click----------------------------------------------------------------

window.onload=function(){
    const section = document.getElementById("section");
    const p = document.getElementById("count");
    function countUp() {
        p.innerHTML++;
    }
    section.addEventListener("click",countUp);
  }

    //Check cards----------------------------------------------------------------
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped"); 
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard")
    console.log(flippedCards);

    
    //Validate----------------------------------------------------------------
    if(flippedCards.length === 2) {
        if(
        flippedCards[0].getAttribute('name') === 
        flippedCards[1].getAttribute('name')
        ) {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        } else { //Lose----------------------------------------------------------------
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCounts.textContent = playerLives;
            if(playerLives === 0) {
                restart("To Bad Loser");
            }
        }
    }
    //win----------------------------------------------------------------
    if(toggleCard.length === 16) {
        setTimeout(() => restart("You won! New game has started!"), 1500)
    }
}

//restart----------------------------------------------------------------
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard")

        setTimeout(() =>{
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
            document.getElementById("timer").innerHTML = "Time: 0" + " Minutes  0" + " Seconds";
            document.getElementById("count").innerHTML = "0";
            clearInterval(timer)
        }, 1000)
    })
    playerLives = 8;
    playerLivesCounts.textContent = playerLives;
    setTimeout(() => window.alert(text), 1000)
    
}



cardGenerator();
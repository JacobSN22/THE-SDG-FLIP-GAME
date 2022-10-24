import { GoalModel } from "./goals.js"

const gameboard = document.getElementById('gameboard')
let cardList = GoalModel()

//Beslutter hvor mange kort der skal være
const numCards = 5;


cardList.sort(()=> Math.random() - 0.5); 
cardList = cardList.slice(0, numCards);
cardList = cardList.concat(cardList);
cardList.sort(() => Math.random() - 0.5);

for(let card of cardList) {
    let div = document.createElement('div')
    div.innerText = card.goal
    gameboard.prepend(div)
}
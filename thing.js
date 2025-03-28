var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// the correct keycode for the konomi code
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
// a value that increments up each time a correct key is pressed
var konamiCodePosition = 0;
var konamiCodeActivated = false;
var enemySpawnInterval = 3000
var enemyAttackEnabled = false

var eventDuration = 20000
var eventTime = 40000

// spawns a gato. 
function spawnGato(sentId, buttonId, cost, numberSent) {
  console.log(sentId, buttonId)

  //console.log("hi")
  if (cash >= cost) {
    cash -= cost
    //console.log("h")
    let divHolder = document.querySelector('#buttonsHolder')//.querySelector('#49')
    let button = divHolder.querySelector('#' + buttonId)
    let clone = document.querySelector(sentId)
    let body = document.querySelector('#bodyID')
    const newClone = clone.cloneNode(true);

    newClone.setAttribute('id', "newClone");
    newClone.classList.remove("hidden")
    document.body.appendChild(newClone);
    //button.classList.toggle("half");
    button.animate({
      transform: "scale(0.7) rotate(0deg)"
    }, 35);

    button.animate({
      transform: "scale(1.001) rotate(0deg)"
    }, 250);

    setTimeout(() => {
      body.removeChild(newClone)
    }, 20000)

  } else if (cash < cost) {
    var duration = 100
    let divHolder = document.querySelector('#buttonsHolder')
    console.log('#text' + numberSent, numberSent)
    let text = divHolder.querySelector('#text' + numberSent)
    //text.style.background = "linear-gradient(180deg, rgb(253, 179, 7), rgb(244, 211, 101))"
    text.style.visibility = (text.style.visibility == 'hidden' ? '' : 'hidden');
    var executed = 0
    //text.setAttribute('id', "blinking")
    function blink() {
        if (executed < 3) {
            executed += 1;
            text.style.visibility = (text.style.visibility == 'hidden' ? '' : 'hidden');
        } 
    };
    //setInterval(blink, 1)
    setInterval(blink, duration)
    
  }
  return
};

// ugprades the bank, causing more money to be generated and increasing the amount the person can hold
function upgradeBank() {

  //console.log("hi")
  if (cash >= currentBankCost && level < levelCap) {
    cash -= currentBankCost
    currentBankCost += 560
    level += 1
    cashEarned += 1 
    cashCap += 1500
    if (level > 8) {
      cashEarned += Math.floor(cashEarned/20)
    } 


    //console.log("h")
    let button = document.querySelector('#bankButton')//.querySelector('#49')
    let buttonLevel = button.querySelector('#bankLevel')
    let buttonCost = button.querySelector('#bankCost')
  
    buttonLevel.innerHTML = "Level " + level
    buttonCost.innerHTML = "¢" + currentBankCost
    if (level >= levelCap) {
      buttonCost.innerHTML = "MAX"
    }

    //button.classList.toggle("half");
    button.animate({
      transform: "scale(0.7) rotate(0deg)"
    }, 35);
    button.animate({
      transform: "scale(1.001) rotate(0deg)"
    }, 250);

  } else if (cash < currentBankCost || level >= levelCap) {
    let button = document.querySelector('#bankButton')//.querySelector('#49')
    let buttonCost = button.querySelector('#bankCost')

    var duration = 100

    //text.style.background = "linear-gradient(180deg, rgb(253, 179, 7), rgb(244, 211, 101))"
    buttonCost.style.visibility = (buttonCost.style.visibility == 'hidden' ? '' : 'hidden');
    var executed = 0
    //text.setAttribute('id', "blinking")
    function blink() {
        if (executed < 3) {
            executed += 1;
            buttonCost.style.visibility = (buttonCost.style.visibility == 'hidden' ? '' : 'hidden');
        } 
    };
    //setInterval(blink, 1)
    setInterval(blink, duration)
    
  }
  return
};

// does the actual function of changing the background image to a diffrent bg image
function activateKomi() {
  
  if (konamiCodeActivated == false) {
      konamiCodeActivated = true
      document.body.style.backgroundImage =  "url('./itfmoonbg.png')"

      var newBox = document.createElement("div")
      document.body.insertAdjacentElement("afterbegin", newBox)
      newBox.classList.add("size-full", "fixed", "top-0", "left-0", "opacity-1", "animate")
      newBox.style.minHeight = "100vh"
      newBox.style.background = "white"
      newBox.style.zIndex = "999999999999"

      let button = document.querySelector('#bankButton')//.querySelector('#49')
      let buttonLevel = button.querySelector('#bankLevel')
      let buttonCost = button.querySelector('#bankCost')
      let body = document.querySelector('#bodyID')

      levelCap = 999
     
      buttonLevel.innerHTML = "Level " + level
      buttonCost.innerHTML = "¢" + currentBankCost

      setTimeout(() => {
          newBox.classList.add("opacity-0", "hide")
      }, 2000)

      setTimeout(() => {
        body.removeChild(newBox)
      }, 3500)

      
      console.log(newBox)

      

  }
 
}

// gets random num between numbers
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRidOf(item) {
  let body = document.querySelector('#bodyID')
  console.log("ouch!")
  item.setAttribute("data-state", "false")
  body.removeChild(item)
  cash += 100

}

// stupid konomi code thing that i have, source code was somewhere from the internet i think
document.addEventListener('keydown', function(e) {

  var key = allowedKeys[e.keyCode];
  var requiredKey = konamiCode[konamiCodePosition];

// incremends a value if the correct key is pressed in the sequence above, which then resets if an incorrect statement is pressed.
  if (key == requiredKey) {
    konamiCodePosition++;
    if (konamiCodePosition == konamiCode.length) {
      activateKomi();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

// spawns enemies every once and a while
let enemyInterval = setInterval(() => {
  if (enemyAttackEnabled == true) {
    console.log("spawn an enemy")


    let divHolder = document.querySelector('#enemyHolder')//.querySelector('#49')
    let enemy = divHolder.querySelector('#dogeDark')
    let body = document.querySelector('#bodyID')
    enemySpawnInterval = getRandomInt(2000,4000)
  
    for (let i = 0; i < getRandomInt(3,15); i++) {
      const newClone = enemy.cloneNode(true);
  
      const lifeTime = 10000
    
      const randX = Math.floor(getRandomInt(1,80));
      const randY = Math.floor(getRandomInt(1,65));
      const randomRotation = Math.floor(getRandomInt(-180,180));
    
      newClone.setAttribute('id', "newClone");
      newClone.classList.remove("hidden")
      document.body.appendChild(newClone);
      //button.classList.toggle("half");
      newClone.classList.add("angryDoge")
      newClone.style.position = 'absolute';
      newClone.style.left =  newClone.style.left +  (randX + '%');
      newClone.style.top = newClone.style.top + (randY + '%');
      newClone.style.transform = `rotate(${randomRotation}deg)`;
    
    
      newClone.animate({
        transform: "scale(0.7) "
      }, lifeTime);
    
    
      setTimeout(() => {
        if (newClone.getAttribute("data-state") == "true") {
          console.log("OOM NOM NOM")
          body.removeChild(newClone)
          cash -= 1000 + (cashCap/2)
        }
    
      }, lifeTime)
    }
  
  }

}, enemySpawnInterval);  


let enemyWaves = setInterval(() => {
  if (enemyAttackEnabled == false) {

    setTimeout(function() { disableAlertText(); }, eventDuration);
    console.log("event triggered")
    enemyAttackEnabled = true
    var duration = 400
  
    //text.style.background = "linear-gradient(180deg, rgb(253, 179, 7), rgb(244, 211, 101))"
    alertText.innerHTML = "DOGE ATTACK IN PROGRESS WATCH OUT"
    alertText.style.visibility = (alertText.style.visibility == 'hidden' ? '' : 'hidden');
    var executed = 0
    //text.setAttribute('id', "blinking")
    function blink() {
        if (executed < 11) {
            executed += 1;
            alertText.style.visibility = (alertText.style.visibility == 'hidden' ? '' : 'hidden');
        } 
    };
    //setInterval(blink, 1)
    setInterval(blink, duration)
  }
},eventTime);


function disableAlertText() {
  console.log("hello event disabled")
  enemyAttackEnabled = false
  let alertHolder = document.querySelector('#alertHolder')

  console.log(alertHolder)
  let alertText = alertHolder.querySelector('#alertText')
  
  alertText.style.visibility = 'hidden'
}



setTimeout(function() { disableAlertText(); }, 80);
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

function upgradeBank() {
  console.log("hello!!")

  //console.log("hi")
  if (cash >= currentBankCost && level < levelCap) {
    cash -= currentBankCost
    currentBankCost += 560
    level += 1
    cashEarned += 1
    cashCap += 1500
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



document.addEventListener('keydown', function(e) {

  var key = allowedKeys[e.keyCode];
  var requiredKey = konamiCode[konamiCodePosition];

// incremends a value if the correct keyis pressed in the sequence above, which then resets if an incorrect statement is pressed.
  if (key == requiredKey) {
    konamiCodePosition++;
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

// does the actual function of changing the background image to a diffrent gradient
function activateCheats() {
  
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

      levelCap = 999
     
      buttonLevel.innerHTML = "Level " + level
      buttonCost.innerHTML = "¢" + currentBankCost

      setTimeout(() => {
          newBox.classList.add("opacity-0", "hide")
      }, 2000)

      setTimeout(() => {
        body.removeChild(newClone)
      }, 2100)

      
      console.log(newBox)

      

  }
 
}
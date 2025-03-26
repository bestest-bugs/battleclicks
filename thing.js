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
  if (cash >= currentBankCost && level < 8) {
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
    if (level >= 8) {
      buttonCost.innerHTML = "MAX"
    }

    //button.classList.toggle("half");
    button.animate({
      transform: "scale(0.7) rotate(0deg)"
    }, 35);
    button.animate({
      transform: "scale(1.001) rotate(0deg)"
    }, 250);

  } else if (cash < currentBankCost || level >= 8) {
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
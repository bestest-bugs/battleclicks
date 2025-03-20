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
    var blink_speed = 250; // every 1000 == 1 second, adjust to suit
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
            //text.style.background = "linear-gradient(180deg, rgb(255, 0, 0), rgb(255, 0, 0))";
            //console.log("bleugh")
            //text.style.webkit-text-fill-color = "transparent";
            //text.style.webkit-background-clip = "text";
        } //else if (executed  < 4 && executed > 2) {
          //executed = 5
          //console.log("bleugh")
         // text.style.background = "linear-gradient(180deg, rgb(253, 179, 7), rgb(244, 211, 101))"
       // }
    };
    //setInterval(blink, 1)
    setInterval(blink, duration)
    
  }
  return
};
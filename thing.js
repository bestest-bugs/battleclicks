function spawnGato(sentId, buttonId, cost) {
  //console.log("hi")
  if (cash >= cost) {
    cash -= cost
    //console.log("h")
    let divHolder = document.querySelector('#buttonsHolder')//.querySelector('#49')
    let button = divHolder.querySelector('#' + buttonId)
    let clone = document.querySelector(sentId)
    const newClone = clone.cloneNode(true);

    newClone.setAttribute('id', "newClone");
    newClone.classList.remove("hidden")
    document.body.appendChild(newClone);
    //button.classList.toggle("half");
    button.animate({
      transform: "scale(0.7) rotate(0deg)"
    }, 35);
    button.animate({
      transform: "scale(1.0) rotate(0deg)"
    }, 250);

    //setTimeout(function () { //setting timeout to remove it later
     
     // newClone = {}
   // },  10)
    //delete newClone
   // setTimeout()
  }

};
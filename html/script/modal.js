


function CenterControl(controlDiv, gameMap) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'rgb(252, 249, 237)';
    controlUI.style.border = '2px solid green';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(81, 186, 42)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '20px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '50px';
    controlText.style.paddingRight = '50px';
    controlText.innerHTML = '<h1> Winner </h1> <br> Your time: ';
    controlUI.appendChild(controlText);

}


const mainDiv = document.querySelector('#main-div');
const resetBtn = document.querySelector('#resetBtn');

window.onload = function () {
    console.log("Loaded")
    createChildren(16);
    createHandlers();
};

function createHandlers() {
    var children = Array.from(document.querySelectorAll('#main-div .child-div'));
    children.forEach(div => div.addEventListener('mouseover', drawRgb));
}

function createChildren(n) {
    for (var i = 0; i < n * n; i++) {
        const childDiv = document.createElement('div');
        childDiv.classList.add('child-div');
        document.documentElement.style.setProperty('--sirina', `calc(100% * (1/${n}))`);
        document.documentElement.style.setProperty('--visina', `calc(100% * (1/${n}))`);
        mainDiv.appendChild(childDiv);
        //console.log("123");
    }
}


function draw() {
    //console.log(children.indexOf(this));
    this.classList.add('black');
}

function drawRgb() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var rbgColor = "rgb(" + x + "," + y + "," + z + ")";
    this.style.backgroundColor = rbgColor;

}

resetBtn.addEventListener('click', reset);

function reset(e) {
    e.preventDefault();
    while (mainDiv.firstChild) {
        mainDiv.firstChild.remove();
    }
    let size = prompt('Insert the size of a new canvas');
    if (isNaN(size) || size < 1 || size > 100){
        alert("Number must be between 1 and 100");
        size = 16;
    }
    createChildren(size);
    createHandlers();
}


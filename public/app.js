var nasa = {};

var datarequest = new XMLHttpRequest();
datarequest.open('GET', '/data', true);
datarequest.onload = function () {
    //load data
    var data = JSON.parse(this.response);
    console.log(data);
    
    // let str = "<ul>";
    // data.nasa.forEach(element => {
    //     str += "<li>" + element.name + " -- " + element.mass + "</li>";
    // });
    // str += "</ul>";
    //populate raw data
    // document.getElementById(settings.rawID).innerHTML = str;
    //assign globals
    nasa.data = data.nasa;
}

// Send request
datarequest.send();
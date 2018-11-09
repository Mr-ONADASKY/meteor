var nasa = {};
var settings = undefined;

var settingrequest = new XMLHttpRequest();
settingrequest.open('GET', '/settings', true);
settingrequest.onload = function () {
    settings = JSON.parse(this.response);

    var datarequest = new XMLHttpRequest();
    datarequest.open('GET', '/data', true);
    datarequest.onload = function () {
        //load data
        var data = JSON.parse(this.response);
        console.log(data);

        let str = "<ul>";
        data.forEach(element => {
            str += "<li>" + element.name + " -- " + element.mass + "</li>";
        });
        str += "</ul>";
        //populate raw data
        document.getElementById(settings.dataid).innerHTML = str;
        //assign globals
        nasa.data = data;

        var myp5 = new p5(s, settings.vizid);
    }

    // Send request
    datarequest.send();

}
settingrequest.send();



//start sketch
var s = function (sketch) {

    sketch.setup = function () {
        const w = document.getElementById(settings.vizid).offsetWidth;
        sketch.createCanvas(w, w);
        console.log(nasa);

    };

    sketch.draw = function () {
        sketch.background(settings.secondarycolor);
        sketch.fill(settings.primarycolor);
        sketch.stroke(settings.primarycolor);
        let w = sketch.width;
        
        for (let index = 0; index < nasa.data.length; index ++) {
            let rad = sketch.map(index, 0, nasa.data.length, 0, 2*Math.PI);
            //rad = index/nasa.data.length*2*Math.pi
            let val = nasa.data[index].mass;
            let radius = val*0.001;
            let x = sketch.cos(rad)*radius;
            let y = sketch.sin(rad)*radius;
            sketch.line(w / 2, w / 2,x + w/2,y+w/2 );
        }


    };
};
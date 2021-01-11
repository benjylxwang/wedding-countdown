var daycount;
var hrcount;
var mincount;
var seccount;
var mscount;

var endtime;

function setup() {
    daycount = document.getElementById("days").getElementsByTagName("number")[0];
    hrcount = document.getElementById("hrs").getElementsByTagName("number")[0];
    mincount = document.getElementById("mins").getElementsByTagName("number")[0];
    seccount = document.getElementById("secs").getElementsByTagName("number")[0];
    mscount = document.getElementById("ms").getElementsByTagName("number")[0];

    endtime = new Date(2021, 6, 3, 12, 0, 0, 0);

    window.setInterval(getCountdown, 1);
}

function setHTML(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    s = (s - mins) / 60
    var hrs = s % 24;
    s = (s - hrs) / 24;
    var days = s;

    daycount.innerHTML = days;
    hrcount.innerHTML = hrs;
    mincount.innerHTML = mins;
    seccount.innerHTML = secs;
    mscount.innerHTML = ms;
}

function getCountdown() {
    var now = new Date();

    var timeleft = endtime - now;

    setHTML(timeleft);
}


window.onload = setup;
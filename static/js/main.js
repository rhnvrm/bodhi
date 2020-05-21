let element = document.getElementById("main");
if (document.body.clientWidth < 632) {
    element.scrollIntoView({behavior: "smooth"});
}
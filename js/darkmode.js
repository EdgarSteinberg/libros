let boton = document.getElementById("botonDarkMode")
boton.addEventListener("click", function () {
    darkMode()
});

let boton2 = document.getElementById("botonLightMode")
boton2.addEventListener("click", function () {
   lightMode()
});

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("theme") == "dark") {
        darkMode()
    } else {
        lightMode()
    }
});

function darkMode() {
    let body = document.querySelector("body")
    body.classList.add("dark-theme")

    localStorage.setItem("theme", "dark")
};

function lightMode() {
    let body = document.querySelector("body")
    body.classList.remove("dark-theme")

    localStorage.setItem("theme", "light")
};
if (window.feather) {
    window.feather.replace({ width: "1em", height: "1em" });
}

document.querySelectorAll("[data-set-theme]").forEach(button => {
    button.addEventListener("click", () => toggleTheme(button.dataset.setTheme));
});

let element = document.getElementById("main");
if (document.body.clientWidth < 632) {
    element.scrollIntoView({behavior: "smooth"});
}


// Set the theme
// Ref: https://livecodestream.dev/post/2020-08-06-a-better-approach-to-dark-mode-on-your-website/
// Capture the current theme from local storage and adjust the page to use the current theme.
const htmlEl = document.getElementsByTagName('html')[0];
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    htmlEl.dataset.theme = currentTheme;
}

// When the user changes the theme, we need to save the new value on local storage
const toggleTheme = (theme) => {
    htmlEl.dataset.theme = theme;
    localStorage.setItem('theme', theme);
}

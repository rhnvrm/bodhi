if (window.feather) {
    window.feather.replace({ width: "1em", height: "1em" });
}

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeButtons = document.querySelectorAll("[data-set-theme]");
let theme = "system";

try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
        theme = savedTheme;
    }
} catch {
    // The theme can still be changed when storage is unavailable.
}

function applyTheme() {
    const systemPreference = systemTheme.matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme === "system" ? systemPreference : theme;
    themeButtons.forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme));
    });
}

themeButtons.forEach(button => {
    button.addEventListener("click", () => {
        theme = button.dataset.setTheme;
        applyTheme();
        try {
            localStorage.setItem("theme", theme);
        } catch {
            // Keep the preference for this page.
        }
    });
});

systemTheme.addEventListener("change", applyTheme);
applyTheme();

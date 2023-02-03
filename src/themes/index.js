import primary from "./primaryTheme/primaryTheme";

let selectedThemeNumber = 0;

const getTheme = () => {
    if (selectedThemeNumber === 0) {
        return {...primary}
    }
}

const selectedTheme = getTheme();

export default selectedTheme;
/**
 *
 * @param {string} str
 */
function capitalize(str) {
    let letterCapitalized = str[0];
    letterCapitalized = letterCapitalized.toUpperCase();
    str = letterCapitalized + str.toLowerCase().substring(1);
    for (let i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            let str2 = str.substring(i + 1).trim();
            str2 = str2[0].toUpperCase() + str2.substring(1);
            str = str.substring(0, i+1) + str2;
        }
    }
    return str;
}

export { capitalize };

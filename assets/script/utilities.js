/**
 * 
 * @param {string} str 
 */
function capitalize(str){
    let letterCapitalized = str[0];
    letterCapitalized = letterCapitalized.toUpperCase();
    return letterCapitalized + str.toLowerCase().substring(1);
}

export {capitalize};
import { teamMembers } from "./db.js";
/**
Dato un array di oggetti rappresentante un team di un’azienda, 
creare una pagina dedicata  in cui mostrare una card per ciascun componente.
 */
// DOM elements selection
const cardWrapper = document.getElementById("card-wrapper");
cardWrapper.insertAdjacentHTML("beforeend", generateCard(teamMembers[0]))

/**
 * 
 * @param {teamMembers[0]} cardObj 
 * @returns 
 */
function generateCard(cardObj){
    return `<div class="card">
                <div class="image">
                    <img src="./assets/${cardObj.img}" alt="${(cardObj.img).substring(0, cardObj.img.length-4)}" />
                </div>
                <span>${cardObj.name}</span>
                <span>${cardObj.role}</span>
                <span>${cardObj.email}</span>
            </div>
        </div>`
}
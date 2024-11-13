import { teamMembers } from "./db.js";
import { capitalize, getRndInteger } from "./utilities.js";
/**
Dato un array di oggetti rappresentante un team di un’azienda, 
creare una pagina dedicata in cui mostrare una card per ciascun componente.
 */
// DOM elements selection
const cardWrapper = document.getElementById("card-wrapper");
const memberForm = document.getElementById("member-form");
const formContainer = document.getElementById("form-container");
for (const member of teamMembers) {
    // generate all cards from array of members
    cardWrapper.insertAdjacentHTML("beforeend", generateCardFrom(member));
}
const trashes = cardWrapper.querySelectorAll(".trash");
// event listeners
memberForm.addEventListener("submit", handleSubmit);
for (const trash of trashes) {
    trash.addEventListener("click", handleTrash);
}
//event handlers
function handleSubmit(e) {
    e.preventDefault();
    // variabili
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const role = document.getElementById("role");
    const roleText = role.options[role.selectedIndex].innerHTML;
    const email = document.getElementById("email");
    const strTemp = getRndInteger(0, 1) ? "male" : "female";
    const image = `img/${strTemp}${getRndInteger(1, 3)}.png`;
    const btnHovers = this.querySelectorAll(".hover");
    // disable hover buttons
    for (const btn of btnHovers) {
        btn.disabled = true;
        btn.classList.toggle("disabled");
        btn.classList.toggle("hover");
    }
    // creazione nuovo membro del team
    const newMember = createNewMember(
        capitalize(fname.value.trim()),
        capitalize(lname.value.trim()),
        roleText,
        email.value,
        image
    );
    // simulazione di un loading con setInterval
    const [clock, modal, modalContent] = loadingText(document.body);
    // al termine del loading fai questo
    setTimeout(() => {
        // stop del setInterval
        clearInterval(clock);
        modalContent.innerHTML = `Congratulations! Your application has been accepted!<br>
        You're part of the team now!`;
        // inserisci in teamMembers il nuovo membro
        teamMembers.push(newMember);
        console.log(teamMembers);
        // genera card usando come valori i valori di input inseriti nel form
        cardWrapper.insertAdjacentHTML(
            "beforeend",
            generateCardFrom(newMember)
        );
        // aggiunge event listener al trash della nuova card
        const lastCard = cardWrapper.lastElementChild;
        lastCard.scrollIntoView(true);
        const newTrash = lastCard.querySelector(".trash");
        newTrash.addEventListener("click", handleTrash);
        // clearing form
        fname.value = "";
        lname.value = "";
        role.value = role.options[0].value;
        email.value = "";
        // eliminazione messaggio di loading e applicazione
        setTimeout(() => {
            modal.remove();
            // enable hover buttons
            for (const btn of btnHovers) {
                btn.disabled = false;
                btn.classList.toggle("disabled");
                btn.classList.toggle("hover");
            }
        }, 2500);
    }, 1500);
}

function handleTrash(e) {
    e.preventDefault();
    e.stopPropagation();
    // selezione in salita della card padre
    const cardParent = this.parentElement.parentElement;
    // ricerca index della card padre rispetto al wrapper
    let index = -1;
    for (let i = 0; i < cardWrapper.childElementCount; i++) {
        if (cardWrapper.children[i] === cardParent) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        // Elimino dall'array dei membri, il membro con l'index trovato
        teamMembers.splice(index, 1);
        // Elimino dalla pagina la card con l'index trovato
        cardParent.remove();
        console.log(teamMembers);
    } else {
        console.error("ERRORE")
    }
}

//! functions
/**
 * @param {teamMembers[0]} obj
 * @returns {string}
 */
function generateCardFrom(obj) {
    return `<div class="card">
                <div class="image">
                    <img 
                        src="./assets/${obj.img}" 
                        alt="${obj.img.substring(4, obj.img.length - 4)}" 
                    />
                </div>
                <div class="d-flex content-between">
                    <span>${obj.name}</span>
                    <i class="fa-solid fa-trash trash"></i>
                </div>
                <span>${obj.role}</span>
                <span>${obj.email}</span>
            </div>
        </div>`;
}
/**
 * @param {string} fname
 * @param {string} lname
 * @param {string} role
 * @param {string} email
 * @param {string} image
 * @returns {object}
 */
function createNewMember(fname, lname, role, email, image) {
    return {
        name: fname + " " + lname,
        role: role,
        email: email,
        img: image,
    };
}
/**
 * @param {HTMLElement} container
 * @returns {[number, HTMLElement] }
 */
function loadingText(container) {
    container.insertAdjacentHTML(
        "beforeend",
        `<div class="modal"><p class="modal-content">Sending . </p></div>`
    );
    const modal = container.querySelector(".modal");
    const modalContent = container.querySelector(".modal-content");
    let count = 1;
    const bound = 3;
    const clock = setInterval(() => {
        count++;
        if (count <= bound) {
            modalContent.append(" .");
        } else {
            modalContent.innerHTML = "Sending .";
            count = 1;
        }
    }, 300);
    return [clock, modal, modalContent];
}

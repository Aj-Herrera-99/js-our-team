import { teamMembers } from "./db.js";
import { capitalize } from "./utilities.js";
/**
Dato un array di oggetti rappresentante un team di un’azienda, 
creare una pagina dedicata  in cui mostrare una card per ciascun componente.
 */
// DOM elements selection
const cardWrapper = document.getElementById("card-wrapper");
const memberForm = document.getElementById("member-form");
const formContainer = document.getElementById("form-container");
let trashes;
// generate all cards
for (const member of teamMembers) {
    cardWrapper.insertAdjacentHTML("beforeend", generateCard(member));
}
trashes = cardWrapper.querySelectorAll(".trash");

// event listeners
memberForm.addEventListener("submit", handleSubmit);
for (const trash of trashes) {
    trash.addEventListener("click", handleTrash);
}

//event handlers
function handleSubmit(e) {
    e.preventDefault();
    // cancellazione messaggio di loading e sending se esiste
    if (document.getElementById("sending")) {
        const sending = document.getElementById("sending");
        sending.remove();
    }
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const role = document.getElementById("role");
    const roleText = role.options[role.selectedIndex].innerHTML;
    const email = document.getElementById("email");
    const image = "img/male1.png";
    const newMember = createNewMember(
        capitalize(fname.value.trim()),
        capitalize(lname.value.trim()),
        roleText,
        email.value,
        image
    );
    // simulazione di un loading
    formContainer.insertAdjacentHTML(
        "beforeend",
        `<p id="sending">Sending . </p>`
    );
    const sending = document.getElementById("sending");
    let count = 1;
    const bound = 3;
    const clock = setInterval(() => {
        count++;
        if (count <= bound) {
            sending.append(" .");
        } else {
            sending.innerHTML = "Sending .";
            count = 1;
        }
    }, 350);
    setTimeout(() => {
        clearInterval(clock);
        sending.innerHTML = `Congratulations! Your application has been accepted!<br>
        You're part of the team now!`;
        // inserisci in teamMembers il nuovo membro
        teamMembers.push(newMember);
        console.log(teamMembers);
        // genera card usando come valori i valori di input inseriti nel form
        cardWrapper.insertAdjacentHTML("beforeend", generateCard(newMember));
        // aggiunge event listener al trash della nuova card
        const newTrash = cardWrapper.lastElementChild.querySelector(".trash");
        console.log(newTrash);
        newTrash.addEventListener("click", handleTrash);
        // clearing form
        fname.value = "";
        lname.value = "";
        role.value = role.options[0].value;
        email.value = "";
    }, 2500);
}

function handleTrash(e) {
    e.preventDefault();
    e.stopPropagation();
    // selezione in salita della card padre
    const cardParent = this.parentElement.parentElement;
    // selezione in salita del card wrapper
    const wrapperParent = this.parentElement.parentElement.parentElement;
    // ricerca index della card padre rispetto al wrapper
    let index = -1;
    for (let i = 0; i < wrapperParent.children.length; i++) {
        if (wrapperParent.children[i] === cardParent) {
            index = i;
            break;
        }
    }
    teamMembers.splice(index, 1);
    cardParent.remove();
    console.log(teamMembers);
}

/**
 *
 * @param {teamMembers[0]} cardObj
 * @returns
 */
function generateCard(cardObj) {
    return `<div class="card">
                <div class="image">
                    <img src="./assets/${
                        cardObj.img
                    }" alt="${cardObj.img.substring(
        0,
        cardObj.img.length - 4
    )}" />
                </div>
                <div class="d-flex content-between">
                    <span>${cardObj.name}</span>
                    <i class="fa-solid fa-trash trash"></i>
                </div>
                <span>${cardObj.role}</span>
                <span>${cardObj.email}</span>
            </div>
        </div>`;
}

function createNewMember(fname, lname, role, email, image) {
    return {
        name: fname + " " + lname,
        role: role,
        email: email,
        img: image,
    };
}

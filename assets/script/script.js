import { teamMembers } from "./db.js";
/**
Dato un array di oggetti rappresentante un team di un’azienda, 
creare una pagina dedicata  in cui mostrare una card per ciascun componente.
 */
// DOM elements selection
const cardWrapper = document.getElementById("card-wrapper");
const memberForm = document.getElementById("member-form");
const formContainer = document.getElementById("form-container");
const role = document.getElementById("role");
// console.log(role.value);
// generate all cards
for (const member of teamMembers) {
    cardWrapper.insertAdjacentHTML("beforeend", generateCard(member));
}
// event listeners
memberForm.addEventListener("submit", handleSubmit);

//event handlers
function handleSubmit(e) {
    e.preventDefault();
    // cancellazione messaggio di loading e sending se esiste
    if(document.getElementById("sending")){
        const sending = document.getElementById("sending");
        sending.remove();
    }
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const role = document.getElementById("role");
    const roleText = role.options[role.selectedIndex].innerHTML;
    const email = document.getElementById("email");
    const image = "img/male1.png";
    const newMember = createNewMember(fname.value.trim(), lname.value.trim(), roleText, email.value, image);
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
        console.log(teamMembers)
        // genera card usando come valori i valori di input inseriti nel form
        cardWrapper.insertAdjacentHTML("beforeend", generateCard(newMember));
        // clearing form
        fname.value = "";
        lname.value = "";
        role.value = role.options[0].value;
        email.value = "";

    }, 2500);
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
                <span>${cardObj.name}</span>
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

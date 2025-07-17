let revealed = false;

const revealButton = document.getElementById("reveal");
const dialog = document.getElementById('reveal-test');
const dialog_window = document.getElementById('reveal-window')

revealButton.addEventListener("click", e => {
    dialog.showModal();
})

dialog.addEventListener("click", e => {
    dialog.close();
})

dialog_window.addEventListener("click", e => {
    e.stopPropagation();
})

const confirm = e => {
        const location = document.getElementById("location");
        location.innerText = "Fredericton, NB";

        const mailto = "mailto:";
        const address = "sagemistressmods";
        const at = String.fromCharCode(64);
        const provider = "gmail.com";

        const mailLink = document.getElementById("email");
        mailLink.innerText = address+at+provider;
        mailLink.setAttribute("href", mailto+address+at+provider);

        const tel = "tel:"
        const country = "+1";
        const area = "902";
        const region = "841";
        const num = "1110";

        const phoneLink = document.getElementById("phone");
        phoneLink.innerText = country+area+region+num;
        phoneLink.setAttribute("href", tel+country+area+region+num);

        revealButton.setAttribute("hidden", "true")
        dialog.close();
}

const rejectHumanity = e => {
    dialog.close();
}

const confirm_button = document.getElementById("confirmHumanity");
confirm_button.addEventListener("click", confirm);

const rejectHumanity_button = document.getElementById("rejectHumanity");
rejectHumanity_button.addEventListener("click", rejectHumanity);

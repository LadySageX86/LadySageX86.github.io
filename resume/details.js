const revealButton = document.getElementById("reveal");
revealButton.addEventListener("click", e => {
    if (confirm("TOTALLY SECURE HUMANITY CHECK!\nClick OK if you are not a bot!")) {
        const location = document.getElementById("location");
        location.innerText = "Fredericton, NB";

        const mailto = "mailto:";
        const address = "spencerwayne310";
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
    }
    else return;
})

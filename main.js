const footer = document.getElementById('footer-text');
const date = new Date();
footer.innerHTML = `Copyright &copy; ${date.getFullYear()} S.W. Smith. Random cat facts courtesy of <a href='https://catfact.ninja'>catfact.ninja</a>.`;

const test_api = "https://catfact.ninja/fact";

document.addEventListener("DOMContentLoaded", async () => {
    await fetch(test_api, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(res => {
        console.log("RES: ", res);
        const test = document.getElementById("test");
        test.innerText = `And now for something completely different: ${res.fact}`;
    }).catch(err => console.error("ERROR: ", err));
})
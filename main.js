const test_url = "https://catfact.ninja"
const test_api = `${test_url}/fact`;
const date = new Date();

const footer = document.getElementById('footer-text');
footer.innerHTML = `Copyright &copy; ${date.getFullYear()} S.W. Smith. Random cat facts courtesy of <a href='${test_url}'>catfact.ninja</a>.`;

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
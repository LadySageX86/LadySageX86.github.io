document.addEventListener("DOMContentLoaded", async () => {
    await fetch(test_api, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(res => {
        console.log("RES: ", res);
        const fact = document.getElementById("fact");
        fact.innerText = `And now for something completely different: ${res.fact}`;
    }).catch(err => console.error("ERROR: ", err));
})
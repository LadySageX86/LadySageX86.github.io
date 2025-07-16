const test_url = "https://catfact.ninja"
const test_api = `${test_url}/fact`;
const date = new Date();

const footer = document.getElementById('footer-text');
footer.innerHTML = `Copyright &copy; ${date.getFullYear()} Sage Smith. Random cat facts courtesy of <a href='${test_url}'>catfact.ninja</a>.`;

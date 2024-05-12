const gcp_btn = document.getElementById("gross-pay");
const gcp_dialog = document.getElementById(`gross-pay-dialog`);
const gcp_win = document.getElementById(`gross-pay-window`);

gcp_btn.addEventListener("click", e => {
    gcp_dialog.showModal();
});
gcp_dialog.addEventListener("click", e => {
    gcp_dialog.close();
})
gcp_win.addEventListener("click", e => {
    e.stopPropagation();
})

const gcp_date = new Date();
const gcp_date_string = `${gcp_date.getFullYear()}-${gcp_date.getMonth() + 1}-${gcp_date.getDate()}`;
const gcp_date_elem = document.getElementById("gross-pay-date");
gcp_date_elem.innerText += gcp_date_string;

const gcp_hrs_input = document.getElementById("gross-pay-hrs");
const gcp_wage_input = document.getElementById("gross-pay-wage");
const gcp_vac_input = document.getElementById("gross-pay-vac");
const gcp_total = document.getElementById("gross-pay-total");

const gcp_calc_gross = (h, w, v) => parseFloat(h) * parseFloat(w) * (1 + parseFloat(v) / 100)

gcp_hrs_input.addEventListener("input", e => {
    if (Number.isNaN(parseInt(e.target.value))) return;
    const gross = gcp_calc_gross(e.target.value, gcp_wage_input.value, gcp_vac_input.value);
    console.log(`VALUES: \n${e.target.value}\n${gcp_wage_input.value}\n${gcp_vac_input}`);
    gcp_total.innerText = `Your gross pay for the week is $${Number.isNaN(gross) ? 0 : gross.toFixed(2)}`;
})

gcp_wage_input.addEventListener("input", e => {
    if (Number.isNaN(parseInt(e.target.value))) return;
    const gross = gcp_calc_gross(gcp_hrs_input.value, e.target.value, gcp_vac_input.value);
    console.log(`VALUES: \n${e.target.value}\n${gcp_hrs_input.value}\n${gcp_vac_input}`);
    gcp_total.innerText = `Your gross pay for the week is $${Number.isNaN(gross) ? 0 : gross.toFixed(2)}`;
})

gcp_vac_input.addEventListener("input", e => {
    if (Number.isNaN(parseInt(e.target.value))) return;
    const gross = gcp_calc_gross(gcp_hrs_input.value, gcp_wage_input.value, e.target.value);
    console.log(`VALUES: \n${e.target.value}\n${gcp_hrs_input.value}\n${gcp_wage_input}`);
    gcp_total.innerText = `Your gross pay for the week is $${Number.isNaN(gross) ? 0 : gross.toFixed(2)}`;
})
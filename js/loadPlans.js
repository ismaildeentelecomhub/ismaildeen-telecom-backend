async function loadPlans() {

    const network = document.getElementById("network").value;

    if (!network) return;

    const planSelect = document.getElementById("variation_code");

    planSelect.innerHTML = "<option>Loading...</option>";

    try {

        const response = await fetch(
            "https://ismaildeen-telecom-backend.onrender.com/api/vtpass/data-plans/" + network
        );

        const data = await response.json();

        planSelect.innerHTML = "";

        data.content.varations.forEach(plan => {

            planSelect.innerHTML += `
                <option value="${plan.variation_code}">
                    ${plan.name} - ₦${plan.variation_amount}
                </option>
            `;

        });

    } catch (error) {

        planSelect.innerHTML =
            "<option>Error Loading Plans</option>";

    }

}

document.getElementById("calculate").addEventListener("click", calculateAge);

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        calculateAge();
    }
});

function calculateAge() {
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    const yearsElement = document.getElementById("years");
    const monthsElement = document.getElementById("months");
    const daysElement = document.getElementById("days");

    if (!isValidDate(day, month, year)) {
        yearsElement.innerText = "--";
        monthsElement.innerText = "--";
        daysElement.innerText = "--";
        alert("Data inválida! Verifique os valores inseridos.");
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    animateNumber("years", ageYears);
    animateNumber("months", ageMonths);
    animateNumber("days", ageDays);
}

function isValidDate(day, month, year) {
    if (!day || !month || !year) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    const testDate = new Date(year, month - 1, day);
    return testDate.getFullYear() === year && testDate.getMonth() === month - 1 && testDate.getDate() === day;
}

function animateNumber(id, finalNumber) {
    let element = document.getElementById(id);
    if (!element) return;
    let start = 0;
    let increment = finalNumber / 50;
    let interval = setInterval(() => {
        start += increment;
        element.innerText = Math.floor(start);
        if (start >= finalNumber) {
            element.innerText = finalNumber;
            clearInterval(interval);
        }
    }, 20);
}

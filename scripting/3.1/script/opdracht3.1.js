let output = document.getElementById("output");
let studentTabel = document.getElementById("studentTabel");

function success() {
    let studenten = JSON.parse(this.responseText);
    console.log(studenten);

    // Vind tbody en maak leeg
    const tbody = document.querySelector('#studentTabel tbody');
    tbody.innerHTML = '';

    if (!Array.isArray(studenten)) return;

    for(const student of studenten) {
        const tr = document.createElement('tr');

        const tdNaam = document.createElement('td');
        tdNaam.textContent = student.studentNaam || '';

        const tdNummer = document.createElement('td');
        tdNummer.textContent = student.studentNummer || '';

        tr.appendChild(tdNaam);
        tr.appendChild(tdNummer);

        tbody.appendChild(tr);
    }
}

function error(err) {
    console.error('Error Occurred :', err);
}

function getStudent(){
    let xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = error;
    xhr.open('GET', 'jsonRead.php', true);
    xhr.send();
}

// Haal initieel al de studenten op die in de database staan
getStudent();

// Verwerk formulier submissie en stuur POST naar jsonWrite.php
const form = document.getElementById('nieuweStudent');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // HTML5 validatie controleren
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const studentNaam = document.getElementById('studentNaam').value.trim();
    const studentNummer = document.getElementById('studentNummer').value.trim();

    const payload = {
        studentNaam: studentNaam,
        studentNummer: studentNummer
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'jsonWrite.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Bij succes opnieuw de lijst ophalen en formulier resetten
                getStudent();
                form.reset();
            } else {
                console.error('Post failed', xhr.status, xhr.responseText);
            }
        }
    };

    xhr.send(JSON.stringify(payload));
});


let output = document.getElementById("output");

function success() {
    let studenten = JSON.parse(this.responseText);
    console.log(studenten);
    for(let student of studenten) {
        let li = document.createElement("li");
        li.textContent = `Studenten Nummer: ${student.studentNummer} - Naam: ${student.studentNaam} - Telefoon Nummer: ${student.studentTelefoon} - Klas: ${student.studentKlas}`;
        output.appendChild(li);
    }
}

function error(err) {
    console.error('Error Occurred :', err);
}

let xhr = new XMLHttpRequest();
xhr.onload = success;
xhr.onerror = error;
xhr.open('GET', 'oefening2.2.json', true);
xhr.send();
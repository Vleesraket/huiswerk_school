const lijst = document.getElementById('lijst');

function success() {
    let studenten = JSON.parse(this.responseText);
    console.log(studenten);
    for(const student of studenten) {
        let li = document.createElement('li');
        li.textContent = `${student.studentNaam}, Nummer ${student.studentNummer}, ${student.studentTelefoon} Telefoon, Klas ${student.studentKlas}`;
        lijst.appendChild(li);
    }
}

function error(err) {
    console.error('Error Occurred :', err);
}


let xhr = new XMLHttpRequest();
xhr.onload = success;
xhr.onerror = error;
xhr.open('GET', 'jsonRead.php', true);
xhr.send();
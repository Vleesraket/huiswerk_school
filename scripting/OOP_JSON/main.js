class Student {

    constructor(studentNummer, studentNaam, studentAchternaam, studentLeeftijd, aantalKlassen) {
        this.studentNummer = studentNummer;
        this.studentNaam = studentNaam;
        this.studentAchternaam = studentAchternaam;
        this.studentLeeftijd = studentLeeftijd;
        this.aantalKlassen = aantalKlassen;
    }
    
    groet() {
        console.log(`Mijn naam is: ${this.studentNaam} ${this.studentAchternaam}
ik ben ${this.studentLeeftijd} jaar oud! en heb ${this.aantalKlassen}. \n`)
    }
}

let Quinn = new Student(101746, "Quinn", "Otto", 17, 6)
let Mik = new Student(101747, "Mik", "Patings", 17, 5)
let Stijn = new Student(101718, "Stijn", "Buitenhek", 18, 6)
let Stachu = new Student(101731, "Stachu", "Goc", 18, 5)
let Rohan = new Student(101725, "Rohan", "Van doormolen", 17, 6)

Quinn.groet()
Mik.groet()
Stijn.groet()
Stachu.groet()
Rohan.groet()

let data = await fetch("https://data.buienradar.nl/2.0/feed/json")
const json = await data.json()

console.log(json.forecast)
async function GetUser() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json();

        if(response.ok === false) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`de naam van de user is ${data.name}`);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

GetUser()
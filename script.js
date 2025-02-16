document.getElementById("submit").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    if (!name || !email || !age) {
        alert("Please fill all fields!");
        return;
    }

    const data = { name, email, age: Number(age) };

    try {
        const response = await fetch("http://localhost:5000/admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data), //server model is data thats why (data) here
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to store data.");
    }
});

document.getElementById('btn').addEventListener('click', async () => {
    try { 
        const response = await fetch('http://localhost:5000/data');
        const data = await response.json();

        // Select the output div
        let outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ""; // Clear previous data

         //after deleting the unorganize data to have specific data
        data.forEach(user => { //every and Each iteration/repeatedly executing a set of instructions,processes one user object.
            let userInfo = document.createElement("output");
            userInfo.textContent = `Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`;
            outputDiv.appendChild(userInfo);
    }); } catch (error) {
        console.error('Error:', error);
    }
});


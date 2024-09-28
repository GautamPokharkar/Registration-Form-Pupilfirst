document.addEventListener('DOMContentLoaded', function() {
    // Load existing registrations from local storage
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.forEach(addRowToTable);
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();
    
    // Calculate age
    const age = today.getFullYear() - dob.getFullYear();
    const isAdult = age >= 18 && age <= 55;

    if (!isAdult) {
        alert("You must be between 18 and 55 years old.");
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const termsAccepted = document.getElementById('terms').checked;

    const registration = { name, email, password, dob: dob.toISOString().split('T')[0], termsAccepted };
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(registration);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    addRowToTable(registration);

    // Clear form fields after submission
    document.getElementById('registrationForm').reset();
});

function addRowToTable({ name, email, password, dob, termsAccepted }) {
    const tableBody = document.getElementById('registrationTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="p-3">${name}</td>
        <td class="p-3">${email}</td>
        <td class="p-3">${password}</td>
        <td class="p-3">${dob}</td>
        <td class="p-3">${termsAccepted}</td>
    `;
    tableBody.appendChild(newRow);
}

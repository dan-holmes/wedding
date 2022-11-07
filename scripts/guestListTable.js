const populateTable = () => {
    getGuestList()
        .then(guests => guests.forEach(guest => {
            const table = document.getElementById("guest-list");
            const row = table.insertRow(1);
            row.insertCell(0).innerHTML = guest.name;
            row.insertCell(1).innerHTML = guest?.RSVP ?? '';
            row.insertCell(2).innerHTML = guest?.diet ?? '';
        }));
}

window.onload = function() {
    populateTable();
}
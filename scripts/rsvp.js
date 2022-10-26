const addAnother = () => {
    const fieldset = document.getElementsByClassName("guest-card")[0];
    const newGuestCard = fieldset.cloneNode(true);
    document.getElementById("rsvp-form-guests").appendChild(newGuestCard);
    const nameInputs = document.getElementsByClassName("name");
    autocomplete(nameInputs[nameInputs.length - 1], guestList);
}

let guestNames = [];
window.addEventListener('load', async (event) => {
    guestNames = await getGuestNames();
    addAnother();
  });

const addAnother = () => {
    const nameInputs = document.getElementsByClassName("name");
    const guestNumber = nameInputs.length;
    const template = document.getElementsByClassName("guest-card-template")[0];
    const newGuestCard = template.content.cloneNode(true);
    newGuestCard.querySelectorAll('[name="rsvp"]').forEach(element => {
        element.setAttribute("name", "rsvp-" + guestNumber)
    });
    newGuestCard.querySelectorAll('[for="rsvp"]').forEach(element => {
        element.setAttribute("for", "rsvp-" + guestNumber)
    });
    document.getElementById("rsvp-form-guests").appendChild(newGuestCard);
    
    autocomplete(nameInputs[guestNumber], guestNames);

    const dietField = document.getElementsByClassName("diet-field")[guestNumber];
    document.getElementsByClassName("yes")[guestNumber]
        .addEventListener("click", () => dietField.style.display = "block");
    document.getElementsByClassName("no")[guestNumber]
        .addEventListener("click", () => dietField.style.display = "none");
}

const updateGuests = () => {
    const form = document.getElementById("rsvp-form");
    const guestCards = Array.from(form.getElementsByClassName("guest-card"));
    const guests = guestCards.map(guestCard => {
        return {
            name: guestCard.querySelector('.name').value,
            RSVP: guestCard.querySelector('input[type=radio]:checked').value,
            diet: guestCard.querySelector('.diet').value,
        }
    });
    
    const data = {
        TableName: "wedding_guests",
        Items: guests
    }

    fetch('https://w6f2wu6d64li4mgei2wrg7z5pa0zueeh.lambda-url.eu-west-2.on.aws/', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorText = await response.text();
                throw Error(errorText);
            }

            return await response.json();
        })
        .then(data => {
            document.getElementById('rsvp-form').innerHTML = "";
            document.getElementById('message').innerHTML =
                `<div class='success'>Successfully submitted RSVP for ${data} guest${data > 1 ? 's' : ''}</div>`
        })
        .catch((err) => {
            console.log(err)
            document.getElementById('message').innerHTML = `<div class='error'>${err}</div>`;
        });
}

const getGuestNames = () => getGuestList().then(guests => guests.map(guest => guest.name));

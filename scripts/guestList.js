const getGuestList = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const password = urlParams.get('password');
    fetch(`https://w6f2wu6d64li4mgei2wrg7z5pa0zueeh.lambda-url.eu-west-2.on.aws/?TableName=wedding_guests${password ? `&password=${password}` : ''}`)
        .then(response => response.json())
        .then(data => {
            guests = data.Items;
            guests.sort((a, b) => (a.name > b.name) ? 1 : -1);
            guests.reverse();
            return guests;
        })
    }
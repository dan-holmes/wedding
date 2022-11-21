const updateCountdown = () => {
    const weddingStart = new Date(2023, 07, 22, 13);
    const msToGo = weddingStart - Date.now();
    
    const seconds = Math.floor(msToGo/1000);
    const w = Math.floor(seconds / (60*60*24*7));
    const d = Math.floor(seconds / (60*60*24)) % 7
    const h = Math.floor(seconds / (60*60)) % 24;
    const m = Math.floor(seconds / 60) % 60;
    const s = seconds % 60;
    document.getElementById('countdown').innerHTML = `${w} weeks, ${d} days, ${h} hours, ${m} minutes and ${s} seconds to go!`
}

window.onload = () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

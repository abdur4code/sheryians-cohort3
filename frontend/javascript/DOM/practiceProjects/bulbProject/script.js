let bulb = document.querySelector('.light-bulb');
let btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    if(bulb.classList.toggle('on')) {
        btn.textContent = 'Off';
    } else {
        btn.textContent = 'On';
    }
});
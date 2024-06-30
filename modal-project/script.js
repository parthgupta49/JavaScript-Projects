let modalIsmeHai = document.querySelector('.modal-container');

let overlay = document.querySelector('.overlay');

function openModal() {
    // modalIsmeHai.classList.add('modal-open')
    modalIsmeHai.style.visibility = 'visible'
    modalIsmeHai.style.zIndex = '20000'
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'initial';
}
function closeModal() {
    // modalIsmeHai.classList.remove('modal-open');
    modalIsmeHai.style.visibility = 'hidden';
    overlay.style.opacity = '0';
}
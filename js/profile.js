
// rotate button + to x when open form
let toggleFormStatus = false;

const toggleForm = () => {
    const modalContainer = document.querySelector('.modal-container');
    const addSongBtn = document.querySelector('.add-song-btn');
    // const btnCloseX = document.querySelector('.btn-close-x');

    if (toggleFormStatus === false) {

        modalContainer.style.visibility = 'visible';
        addSongBtn.style.transform = 'rotate(45deg)';
        // btnCloseX.style.backgroundColor = 'red';
        toggleFormStatus = true;

    } else if (toggleFormStatus === true) {

        modalContainer.style.visibility = 'hidden';
        addSongBtn.style.transform = 'rotate(0deg)';
        // btnCloseX.style.backgroundColor = '#38C48B';
        toggleFormStatus = false;
    }
}
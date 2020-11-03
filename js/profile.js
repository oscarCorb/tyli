


// const addNewSong = () => {
//     const addSongBtn = document.querySelector('.add-song-btn');
//     const addSongText = document.querySelector('.add-song-text');

//     addSongBtn.addEventListener('click', function () {
//         // aquí tendré que ejecutar el form para abrirlo
//         // y quitar el console.log
//         console.log('click on button');
//     });

//     addSongText.addEventListener('click', function () {
//         // aquí tendrá que ir la ejecución de abir formulario
//         console.log('click on text');
//         body.style.opacity = 0.5;
//         // main.style.visibility = 'visible';
//     });
// }

// addNewSong();







// const displayNewSongForm = () => {

//     const addSongBtn = document.querySelector('.add-song-btn');
//     const addSongText = document.querySelector('.add-song-text');
//     const modalContainer = document.querySelector('.modal-container');

//     addSongBtn.addEventListener('click', () => {
//         modalContainer.style.display = 'initial';
//         addSongBtn.style.transform = 'rotate(45deg)';
//     });

//     addSongText.addEventListener('click', () => {
//         modalContainer.style.display = 'initial';
//         addSongBtn.style.transform = 'rotate(45deg)';
//     });
// }

// displayNewSongForm();

// const closeNewSongForm = () => {

//     const closeBtnX = document.querySelector('.close-x');
//     const modalContainer = document.querySelector('.modal-container');

//     closeBtnX.addEventListener('click', () => {
//         modalContainer.style.display = 'none';
//     });
// }

// closeNewSongForm();




let toggleFormStatus = false;

const toggleForm = () => {
    const modalContainer = document.querySelector('.modal-container');
    const addSongBtn = document.querySelector('.add-song-btn');

    if (toggleFormStatus === false) {

        modalContainer.style.visibility = 'visible';
        addSongBtn.style.transform = 'rotate(45deg)';
        toggleFormStatus = true;

    } else if (toggleFormStatus === true) {
        
        modalContainer.style.visibility = 'hidden';
        addSongBtn.style.transform = 'rotate(0deg)';
        toggleFormStatus = false;
    }
}
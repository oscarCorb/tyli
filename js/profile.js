// ===== Global variables/constants ===== //
const modalContainer = document.querySelector('.modal-container');
const addSongBtn = document.querySelector('.add-song-btn');
const addSongForm = document.querySelector('.addSongForm');
const myTracks = document.querySelector('.myTracks');
const trackCard = document.querySelector('.trackCard');
const trackCardOpen = document.querySelector('.trackCardOpen');

let songsArr = [];
let toggleFormStatus = false;

// ===== Functions ===== //

// display add your music form (modal window)
const toggleForm = () => {

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

const createSong = (title, genre, software, hardware, inspiration) => {
    const song = {
        title: title,
        genre: genre,
        software: software,
        hardware: hardware,
        inspiration: inspiration
    }
    songsArr.unshift(song);

    return song;
}

// almacenar canción/objeto en local storage
const saveToLocalStorage = () => {
    localStorage.setItem('Song', JSON.stringify(songsArr));
    printDB();
}

const printDB = () => {
    myTracks.innerHTML = '';

    songsArr = JSON.parse(localStorage.getItem('Song'));

    if (songsArr === null) {
        songsArr = [];
    } else {
        songsArr.forEach(element => {
            myTracks.innerHTML += `
            <div class="track trackCard">
                <p class="track-title">${element.title}</p>
                <div class="track-arrow-btn">
                    <a href="#">
                        <span class="material-icons">
                            keyboard_arrow_down
                        </span>
                    </a>
                </div>
                <div class="track-play-btn">
                    <a href="#">
                        <span class="material-icons track-play-btn">
                            play_arrow
                        </span>
                    </a>
                </div>
            </div>
            `;
        });
    }
}

// ===== EventListeners ===== //
addSongForm.addEventListener('submit', (e) => {
    // para que no se cierre el formulario
    // e.preventDefault();

    const titleStorage = document.querySelector('.titleStorage').value;
    const genreStorage = document.querySelector('.genreStorage').value;
    const softwareStorage = document.querySelector('.softwareStorage').value;
    const hardwareStorage = document.querySelector('.hardwareStorage').value;
    const inspirationStorage = document.querySelector('.inspirationStorage').value;

    // instanciar canción con los datos introducidos
    createSong(titleStorage, genreStorage, softwareStorage, hardwareStorage, inspirationStorage);

    // almacenar en local storage arrays de canciones
    saveToLocalStorage();

    // limpiar el formulario (no hace falta si ya se cierra)
    // addSongForm.reset();

    // cerrar ventana modal del formulario y rotar x a +
    modalContainer.style.visibility = 'hidden';
    addSongBtn.style.transform = 'rotate(0deg)';
});

// imprimir tarjeta/canción en pantalla
document.addEventListener('DOMContentLoaded', printDB);

myTracks.addEventListener('click', (e) => {
    e.preventDefault();

    // console.log(e.path[3].childNodes[1].innerHTML); // flechita para desplegar
    console.log(e.target.innerHTML);

    // console.log(e.path[4].childNodes[1].innerHTML); // botón play
    // console.log(e.path[1].childNodes[1].innerHTML); // nombre tarjeta
});




// ===== botón provisional para BORRAR TODO ===== ****
const deleteAll = document.querySelector('.deleteAll');
deleteAll.addEventListener('click', () => {
    window.localStorage.clear();
    myTracks.innerHTML = '';
});

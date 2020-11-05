// SECTION: Global variables/constants
const modalContainer = document.querySelector('.modal-container');
const addSongBtn = document.querySelector('.add-song-btn');
const addSongForm = document.querySelector('.addSongForm');
const myTracks = document.querySelector('.myTracks');
const trackCard = document.querySelector('.trackCard');
const trackCardOpen = document.querySelector('.trackCardOpen');

let songsArr = [];

// display add your music form (modal window)
let toggleFormStatus = false;

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

// // localStorage constants (estas ya la estoy usando abajo)
// const titleStorage = document.querySelector('.titleStorage');
// const genreStorage = document.querySelector('.genreStorage');
// const softwareStorage = document.querySelector('.softwareStorage');
// const hardwareStorage = document.querySelector('.hardwareStorage');
// const inspirationStorage = document.querySelector('.inspirationStorage');
// const submitBtn = document.querySelector('.submitBtn');

// // save form data to localStorage
// const saveToLocalStorage = () => {
//     localStorage.setItem('title', title.value);
//     localStorage.setItem('genre', genre.value);
//     localStorage.setItem('software', software.value);
//     localStorage.setItem('hardware', hardware.value);
//     localStorage.setItem('inspiration', inspiration.value);
// }

// submitBtn.addEventListener('click', saveToLocalStorage);


// SECTION: Functions
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
    console.log(songsArr);

    if (songsArr === null) {
        songsArr = [];
    } else {
        songsArr.forEach(element => {
            myTracks.innerHTML += `
            <div class="track trackCard">
                <p class="track-title">${element.title}</p>
                <div class="track-arrow-btn">
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="30px"
                            height="35px">
                            <path
                                d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
                        </svg>
                    </a>
                </div>
                <div class="track-play-btn">
                    <a href="#">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320.001 320.001"
                            style="enable-background:new 0 0 320.001 320.001;" xml:space="preserve">
                            <path d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
	c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
    c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z" />
                        </svg>
                    </a>
                </div>
            </div>
            `;
        });
    }
}

// SECTION: EventListeners
addSongForm.addEventListener('submit', (e) => {
    // para que no se cierre el formulario
    // e.preventDefault();

    // variables
    const titleStorage = document.querySelector('.titleStorage').value;
    const genreStorage = document.querySelector('.genreStorage').value;
    const softwareStorage = document.querySelector('.softwareStorage').value;
    const hardwareStorage = document.querySelector('.hardwareStorage').value;
    const inspirationStorage = document.querySelector('.inspirationStorage').value;

    // instanciar de la canción con los datos introducidos
    createSong(titleStorage, genreStorage, softwareStorage, hardwareStorage, inspirationStorage);

    // almacenar en local storage arrays de canciones
    saveToLocalStorage();

    // limpiar el formulario
    addSongForm.reset();

    // cerrar ventana modal del formulario y rotar x a +
    modalContainer.style.visibility = 'hidden';
    addSongBtn.style.transform = 'rotate(0deg)';
});

// imprimir tarjeta/canción en pantalla
document.addEventListener('DOMContentLoaded', printDB)

// botón provisional para BORRAR TODO
const deleteAll = document.querySelector('.deleteAll');
deleteAll.addEventListener('click', () => {
    window.localStorage.clear();
    myTracks.innerHTML = '';
});

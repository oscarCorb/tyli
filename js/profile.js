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

let openTrackIndex;

const printDB = () => {
    myTracks.innerHTML = '';

    songsArr = JSON.parse(localStorage.getItem('Song'));

    if (songsArr === null) {
        songsArr = [];
    } else {
        songsArr.forEach((element, index) => {
            if (index !== openTrackIndex) {
                myTracks.innerHTML += `
                    <div class="track trackCard">
                        <p class="track-title">${element.title}</p>
                        <div class="track-arrow-btn">
                            <a href="#">
                                <span class="material-icons">keyboard_arrow_down</span>
                            </a>
                        </div>
                        <div class="track-play-btn">
                            <a href="#">
                                <span class="material-icons track-play-btn">play_arrow</span>
                            </a>
                        </div>
                    </div>
                `;
            } else {
                myTracks.innerHTML += `
                    <div class="track-open trackCardOpen">
                        <div class="track-info">
                            <!-- track info when open -->
                            <table>
                                <tr>
                                    <th>title</th>
                                    <td>${element.title}</td>
                                </tr>
                                <tr>
                                    <th>genre</th>
                                    <td>${element.genre}</td>
                                </tr>
                                <tr>
                                    <th>software</th>
                                    <td>${element.software}</td>
                                </tr>
                                <tr>
                                    <th>hardware</th>
                                    <td>${element.hardware}</td>
                                </tr>
                                <tr>
                                    <th>inspiration</th>
                                    <td>${element.inspiration}</td>
                                </tr>

                            </table>
                        </div>
                        <!-- track info BUTTONS when open -->
                        <div class="track-info-buttons">
                            <div class="track-info-close-btn">
                                <a href="">
                                    <span class="material-icons">close</span>
                                </a>
                            </div>
                            <div class="track-info-play-btn">
                                <a href="">
                                    <span class="material-icons">play_circle_outline</span>
                                </a>
                            </div>
                            <div class="track-info-edit-btn">
                                <a href="">
                                    <span class="material-icons">create</span>
                                </a>
                                </a>
                            </div>
                            <div class="track-info-delete-btn">
                                <a href="">
                                    <span class="material-icons">delete</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                `;
            }
        });
    }
}


// el argumento 'song' es el título de la canción
const dropDownTrack = (song) => {

    // find track which match with argument (cicked song)
    let indexArr;

    songsArr.forEach((element, index) => {
        if (element.title === song) {
            // indexArr = index;
            openTrackIndex = index;
        }
    });
    console.log(songsArr[indexArr]);

    // #2 imprimir todo y en el que coincide, imprimir track abierto


    console.log(songsArr[indexArr]);
    // #3 mostrar track abierto, supongo que mostrando todo otra vez?
    printDB();
}

// ===== EventListeners ===== //
addSongForm.addEventListener('submit', (e) => {
    // para que no se cierre el formulario
    // e.preventDefault();

    const songTitle = document.querySelector('.songTitle').value;
    const songGenre = document.querySelector('.songGenre').value;
    const songSoftware = document.querySelector('.songSoftware').value;
    const songHardware = document.querySelector('.songHardware').value;
    const songInspiration = document.querySelector('.songInspiration').value;

    // instanciar canción con los datos introducidos
    createSong(songTitle, songGenre, songSoftware, songHardware, songInspiration);

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

    // para mostrat title al pinchar en tarjeta
    // console.log(e.target.innerHTML);

    if (e.target.innerHTML === 'keyboard_arrow_down' || e.target.innerHTML === 'play_arrow') {
        // muestra title cuando se pincha en icono (papelera o flecha)
        let iconPath = e.path[3].childNodes[1].innerHTML;

        if (e.target.innerHTML === 'keyboard_arrow_down') {
            dropDownTrack(iconPath);
        }
    }
});




// ===== botón provisional para BORRAR TODO ===== ****
const deleteAll = document.querySelector('.deleteAll');
deleteAll.addEventListener('click', () => {
    window.localStorage.clear();
    myTracks.innerHTML = '';
});

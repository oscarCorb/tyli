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
                            <div class="track-info-delete-btn">
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="31" viewBox="0 0 24 24" fill="#2F3E5C"
                                        width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </svg>
                                </a>
                            </div>
                            <div class="track-info-arrow-btn">
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 14" fill="#2F3E5C" width="30px"
                                        height="18px">
                                        <path
                                            d="M8.12 14.71L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.39-.39-1.02-.39-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z" />
                                    </svg>
                                </a>
                            </div>
                            <div class="track-info-play-btn">
                                <a href="">
                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#2F3E5C"
                                        viewBox="-100 -50 420.001 420.001" style="enable-background:new 0 0 320.001 320.001;"
                                        xml:space="preserve">
                                        <path d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
                    c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
                    c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z" />
                                    </svg>
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


import { Track }      from './Track.js';
import { TrackList }  from './TrackList.js';
import { TrackCache } from './TrackCache.js';

// ===== GLOBAL VARIABLES ===== //
// const trackList = new TrackList();
const trackCache = new TrackCache('tracks');
const trackList  = new TrackList(trackCache);

const myTracksSection = document.querySelector('.myTracksSection');

// ===== FUNCTIONS ===== //

// print track cards (normal version)
const makeTrackCardHtml = (track) => {
    const html =  `
        <div class="track-card trackCard" data-id="${track.id}">
            <p class="track-card-title">${track.title}</p>
            <div class="track-dropdown-btn">
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

    return html;
}

// print track info card (open version with track info)
const makeTrackInfoCardHtml = (track) => {
    const html = `
        <div class="track-info-card trackInfoCard" data-id="${track.id}">
            <!-- TABLE -->
            <div class="track-info-text">
                <table>
                    <tr>
                        <th>title</th>
                        <td>${track.title}</td>
                    </tr>
                    <tr>
                        <th>genre</th>
                        <td>${track.genre}</td>
                    </tr>
                    <tr>
                        <th>software</th>
                        <td>${track.software}</td>
                    </tr>
                    <tr>
                        <th>hardware</th>
                        <td>${track.hardware}</td>
                    </tr>
                    <tr>
                        <th>inspiration</th>
                        <td>${track.inspiration}</td>
                    </tr>

                </table>
            </div>
            <!-- BUTTONS -->
            <div class="track-info-buttons">
                <div class="track-info-close-btn">
                    <a href="#">
                        <span class="material-icons">close</span>
                    </a>
                </div>
                <div class="track-info-play-btn">
                    <a href="#">
                        <span class="material-icons">play_circle_outline</span>
                    </a>
                </div>
                <div class="track-info-edit-btn">
                    <a href="#">
                        <span class="material-icons">edit</span>
                    </a>
                    </a>
                </div>
                <div class="track-info-delete-btn">
                    <a href="#">
                        <span class="material-icons">delete</span>
                    </a>
                </div>
            </div>
        </div>           
    `;

    return html;
}

// choose normal card or info card to print it
const makeTrackCard = (track, trackId) => {

    const div = document.createElement('div');

    div.innerHTML = trackId == track.id
        ? makeTrackInfoCardHtml(track)
        : makeTrackCardHtml(track);
    
    myTracksSection.append(div);

    return div;
}

// print track cards
const printDB = (trackId) => {

    myTracksSection.innerHTML = '';

    trackList.tracks.forEach(track => {
        makeTrackCard(track, trackId);
    });
}

printDB();

// const trackInfoEditBtn    = document.querySelector('.track-info-edit-btn');

// ===== GLOBAL VARIABLES ===== //
const addNewTrackBtn     = document.querySelector('.add-song-btn'); // botón +
const modalContainer     = document.querySelector('.modal-container');

const trackForm          = document.querySelector('.trackForm');
const addNewTrackForm    = document.querySelector('.addNewTrackForm');
const editTrackForm      = document.querySelector('.editTrackForm');

const submitAddTrackBtn  = document.querySelector('.submitAddTrackBtn');
const submitEditTrackBtn = document.querySelector('.submitEditTrackBtn');


// ===== EVENTS ===== //
//** auto-focus the first form input field **
/**  just for testing **/ const trackTitleFocus = document.querySelector('.trackTitle');


// click + button to open form
addNewTrackBtn.addEventListener('click', () => {

    // aquí tendría que quitar la clase al botón ???


    if (toggleFormStatus === false) {
        displayForm();
    } else {
        hideForm();
    }
});

let toggleFormStatus = false;

// display form in a modal window
const displayForm = () => {
    modalContainer.style.visibility = 'visible';
    addNewTrackBtn.style.transform = 'rotate(45deg)';
    toggleFormStatus = true;
    trackTitleFocus.focus(); /** just for testing **/
}

// close/hide form and modal window
const hideForm = () => {
    modalContainer.style.visibility = 'hidden';
    addNewTrackBtn.style.transform = 'rotate(0deg)';
    toggleFormStatus = false;
    trackForm.reset();
    printDB();
}

const trackTitle       = document.querySelector('.trackTitle');
const trackGenre       = document.querySelector('.trackGenre');
const trackSoftware    = document.querySelector('.trackSoftware');
const trackHardware    = document.querySelector('.trackHardware');
const trackInspiration = document.querySelector('.trackInspiration');

// click save button (ADD track form)
submitAddTrackBtn.addEventListener('click', (e) => {
    
    e.preventDefault();
    
    const newTrackForm = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    
    trackList.addTrack(newTrackForm);
    
    hideForm();
});

// edit form fields
const editFormTitle       = document.forms[0][0];
const editFormGenre       = document.forms[0][1];
const editFormSofware     = document.forms[0][2];
const editFormHardware    = document.forms[0][3];
const editFormInspiration = document.forms[0][4];

let indexOfTrackToEdit;
let trackToEdit;

// edit track
const trackInfoEditBtn = (trackId) => {

    displayForm();

    // search in DB which track match with argument
    trackList.tracks.find((track, index) => {
        if (track.id == trackId) {
            trackToEdit = track;
            indexOfTrackToEdit = index;
        }
    });

    filledOutEditForm();
}

// auto-filled out form when click on edit track button
const filledOutEditForm = () => {

    const trackEntries = Object.entries(trackToEdit); // console.log(trackToEdit);

    for (const track of trackEntries) {

            switch (track[0]) {
                case 'title':
                    editFormTitle.value = track[1];
                    break;
                case 'genre':
                    editFormGenre.value = track[1];
                    break;
                case 'software':
                    editFormSofware.value = track[1];
                    break;
                case 'hardware':
                    editFormHardware.value = track[1];
                    break;
                case 'inspiration':
                    editFormInspiration.value = track[1];
                    break;
        }
    }
}

// click save button (EDIT track form)
submitEditTrackBtn.addEventListener('click', (e) => {
    
    e.preventDefault();

    const editedTrack = new Track(editFormTitle.value, editFormGenre.value, editFormSofware.value, editFormHardware.value, editFormInspiration.value);

    trackList.editTrack(editedTrack, indexOfTrackToEdit);
    
    hideForm();
});

const trackInfoCard = document.querySelector('.trackInfoCard');

// dropdown: click arow to display track info
myTracksSection.addEventListener('click', (e) => {

    if (e.target.innerText === 'keyboard_arrow_down') {
        
        printDB(e.path[3].dataset.id);
    }
});

// *** CREANDO ESTO: me da problemas quizá porque los botones aún no están renderizados
// trackInfoCard.addEventListener('click', (e) => {
    
//     console.log(e);
// });

// dropdown track when click on arrow icon to see track info
// myTracksSection.addEventListener('click', (e) => { 
//     if (e.target.innerText === 'close') {
//         printDB();
//     }

//     if (e.target.innerText === 'edit') {        
//         trackInfoEditBtn(e.path[4].dataset.id);
//     }

//     // const idDeleteBtnPath = e.path[5].childNodes[1].dataset.id;
//     if (e.target.innerText === 'delete') {
//         // prompt o similar con sí o no: ¿Are you sure? I will be deleted permanently.
//             // => No. FIN
//             // => Sí:
//             // Borrar canción del local storage según su ID
//             // Print
//     }
// });

// console.log(e.target.innerText);
// console.log(e);

// ideal improves:
// ESC key should also close forms
// modal form title when edit: 'New track deatils' to 'Edit track details'

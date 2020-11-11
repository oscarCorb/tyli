
import { Track }      from './Track.js';
import { TrackList }  from './TrackList.js';
import { TrackCache } from './TrackCache.js';

// ===== GLOBAL VARIABLES ===== //
// const trackList = new TrackList();
const trackCache = new TrackCache('tracks');
const trackList  = new TrackList(trackCache);

const divMyTracksSection = document.querySelector('.myTracksSection');

// ===== FUNCTIONS ===== //

const makeTrackCardHTML = (track, trackId) => {

    const htmlTrackCard = `
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

    const htmlTrackInfoCard = `
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
                        <span class="material-icons">edit</span>
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

    const div = document.createElement('div');

    div.innerHTML = trackId == track.id ? htmlTrackInfoCard : htmlTrackCard;
    
    divMyTracksSection.append(div);

    return div;
}

const printDB = (trackId) => {

    divMyTracksSection.innerHTML = '';

    trackList.tracks.forEach(track => {
        makeTrackCardHTML(track, trackId);
    });
}

printDB();

// const trackInfoEditBtn    = document.querySelector('.track-info-edit-btn');
const editFormTitle       = document.forms[0][0];
const editFormGenre       = document.forms[0][1];
const editFormSofware     = document.forms[0][2];
const editFormHardware    = document.forms[0][3];
const editFormInspiration = document.forms[0][4];
let indexOfTrackToEdit;
let trackToEdit;

// edit track function
const trackInfoEditBtn = (trackId) => {

    // search track in DB which match with trackID argument
    trackList.tracks.find((track, index) => {
        if (track.id == trackId) {
            trackToEdit = track;
            indexOfTrackToEdit = index;
        }
    });
    
    const trackEntries = Object.entries(trackToEdit); console.log(trackToEdit);

    // fill out form with DB info in order to edit track
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

const editTrackFormEvent = () => {

    editTrackForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const editedTrack = new Track(editFormTitle.value, editFormGenre.value, editFormSofware.value, editFormHardware.value, editFormInspiration.value);

        //
        console.log(trackList.editedTrack);

        trackList.editTrack(editedTrack, indexOfTrackToEdit);

        printDB();
        editTrackForm.reset();
    });
}

// ===== GLOBAL VARIABLES ===== //
const addNewTrackBtn  = document.querySelector('.add-song-btn');
const modalContainer  = document.querySelector('.modal-container');
const addNewTrackForm = document.querySelector('.addNewTrackForm');
const editTrackForm   = document.querySelector('.editTrackForm');

let toggleFormStatus = false;


// ===== EVENTS ===== //
// auto-focus the first form input field // just for testing
const trackTitleFocus = document.querySelector('.trackTitle'); // just for testing

// display modal window/form 
addNewTrackBtn.addEventListener('click', ()=> {
    
    if (toggleFormStatus === false) {
        
        modalContainer.style.visibility = 'visible';
        addNewTrackBtn.style.transform = 'rotate(45deg)';
        toggleFormStatus = true;
        trackTitleFocus.focus(); // just for testing

    } else if (toggleFormStatus === true) {

        modalContainer.style.visibility = 'hidden';
        addNewTrackBtn.style.transform = 'rotate(0deg)';
        toggleFormStatus = false;
    }
});

// create new song => close form => print tracklist
addNewTrackForm.addEventListener('submit', (e) => {

    e.preventDefault();
    
    const trackTitle       = document.querySelector('.trackTitle');
    const trackGenre       = document.querySelector('.trackGenre');
    const trackSoftware    = document.querySelector('.trackSoftware');
    const trackHardware    = document.querySelector('.trackHardware');
    const trackInspiration = document.querySelector('.trackInspiration');
    
    const newTrackForm = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    trackList.addTrack(newTrackForm);

    modalContainer.style.visibility = 'hidden';
    addNewTrackBtn.style.transform = 'rotate(0deg)';
    toggleFormStatus = false;
    addNewTrackForm.reset();
    printDB();    
});

// dropdown track info when click on arrow icon
divMyTracksSection.addEventListener('click', (e) => { 

    e.preventDefault();
    
    const idTrackCardPath = e.path[3].dataset.id;

    if (e.target.innerText === 'keyboard_arrow_down') {
        printDB(idTrackCardPath);
    }

    if (e.target.innerText === 'close') {
        printDB();
    }

    if (e.target.innerText === 'edit') {

        const trackIdPath = e.path[4].dataset.id;

        modalContainer.style.visibility = 'visible';
        addNewTrackBtn.style.transform  = 'rotate(45deg)';
        // ideal improve: transform 'New track deatils' to 'Edit track details'
        toggleFormStatus = true;
        
        trackInfoEditBtn(trackIdPath);        
        editTrackFormEvent();
    }

    // const idDeleteBtnPath = e.path[5].childNodes[1].dataset.id;
    if (e.target.innerText === 'delete') {
        // prompt o similar con sí o no: ¿Are you sure? I will be deleted permanently.
            // => No. FIN
            // => Sí:
            // Borrar canción del local storage según su ID
            // Print
    }
    
    if (e.target.innerText === 'play_circle_outline') {
        // HACER LÓGICA
    }
});

// console.log(e.target.innerText);
// console.log(e);

// ideal improves:
// ESC key should also close forms
// reverse loop to order tracks backwards (newest first)

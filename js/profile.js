
import { Track }      from './Track.js';
import { TrackList }  from './TrackList.js';
import { TrackCache } from './TrackCache.js';


// ===== GLOBAL VARIABLES ===== //
const myTracksSection = document.querySelector('.myTracksSection');
const addNewTrackBtn = document.querySelector('.add-song-btn');
const modalContainer = document.querySelector('.modal-container');
const trackForm = document.querySelector('.trackForm');

// edit form fields
const editFormTitle       = document.forms[0][0];
const editFormGenre       = document.forms[0][1];
const editFormSofware     = document.forms[0][2];
const editFormHardware    = document.forms[0][3];
const editFormInspiration = document.forms[0][4];

let toggleFormStatus = false; // toggle form: open or closed
let toggleSubmitForm; // toggle submit button: add or edit
let indexOfTrackToEdit;
let trackToEdit;

/**  just for testing => **/ const trackTitleFocus = document.querySelector('.trackTitle');

const trackCache = new TrackCache('tracks');
const trackList  = new TrackList(trackCache);


// ===== FUNCTIONS ===== //

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

// choose normal card or info card to print it
const makeTrackCard = (track, trackId) => {

    const div = document.createElement('div');

    if (trackId == track.id) {
        div.innerHTML = makeTrackInfoCardHtml(track);
        registerEventListeners(div);
    } else {
        div.innerHTML = makeTrackCardHtml(track);
    }

    myTracksSection.append(div);
    
    return div;
}

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
        <div class="track-info-card" data-id="${track.id}">
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

// print track cards
const printDB = (trackId) => {

    myTracksSection.innerHTML = '';

    trackList.tracks.forEach(track => {
        makeTrackCard(track, trackId);
    });
}

printDB();

// info track buttons: event listeners
const registerEventListeners = (div) => {

    const closeBtn  = div.querySelector('.track-info-close-btn');
    const editBtn   = div.querySelector('.track-info-edit-btn');
    const deleteBtn = div.querySelector('.track-info-delete-btn');

    closeBtn.addEventListener('click', () => {
        printDB();
    });

    editBtn.addEventListener('click', (e) => {
        toggleSubmitForm = 'edit';
        let trackId = e.path[4].dataset.id;
        trackInfoEditBtn(trackId);
    });

    deleteBtn.addEventListener('click', (e) => { //***
        let trackId = e.path[4].dataset.id;
        trackInfoDeleteBtn(trackId);
    });
}

// edit track
const trackInfoEditBtn = (trackId) => {

    displayForm();

    // search in DB which track matches argument
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

    const trackEntries = Object.entries(trackToEdit);

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

// delete track
const trackInfoDeleteBtn = (trackId) => { //***

    let indexOfTrackToDelete;

    trackList.tracks.find((track, index) => {
        if (track.id == trackId) {
            indexOfTrackToDelete = index;
        }
    });
    
    trackList.deleteTrack(indexOfTrackToDelete);

    printDB();
}


// ===== EVENTS ===== //

// click + button to add new tracks
addNewTrackBtn.addEventListener('click', () => {

    toggleSubmitForm = 'add';

    if (toggleFormStatus === false) {
        displayForm();
    } else {
        hideForm();
    }
});

// voy a intentar hacer un evento con los 2 botones submits en un if
trackForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    
    const trackTitle       = document.querySelector('.trackTitle');
    const trackGenre       = document.querySelector('.trackGenre');
    const trackSoftware    = document.querySelector('.trackSoftware');
    const trackHardware    = document.querySelector('.trackHardware');
    const trackInspiration = document.querySelector('.trackInspiration');

    if (toggleSubmitForm === 'add') {

        const addOneTrack = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    
        trackList.addTrack(addOneTrack);
    }

    if (toggleSubmitForm === 'edit') {

        const editOneTrack = new Track(editFormTitle.value, editFormGenre.value, editFormSofware.value, editFormHardware.value, editFormInspiration.value);

        trackList.editTrack(indexOfTrackToEdit, editOneTrack);
    }

    hideForm();
})

// dropdown: click arow to display track info
myTracksSection.addEventListener('click', (e) => {

    if (e.target.innerText === 'keyboard_arrow_down') {
        
        printDB(e.path[3].dataset.id);
    }
});

// console.log(e.target.innerText);

// ideal improves:
// ESC key should also close forms
// modal form title when edit: 'New track deatils' to 'Edit track details'
// style.tranform should working with a CSS class

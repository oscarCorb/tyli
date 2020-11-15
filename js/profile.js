import {Track} from './Track.js';
import {TrackList} from './TrackList.js';
import {TrackCache} from './TrackCache.js';
import {makeTrackInfoCardHtml, makeTrackCardHtml} from './templates.js';

// ===== GLOBAL VARIABLES ===== //
const myTracksSection = document.getElementById('myTracksSection');
const addNewTrackBtn = document.querySelector('.add-song-btn');
const modalContainer = document.querySelector('.modal-container');
const trackForm = document.querySelector('.trackForm');

const trackTitle = document.getElementById('title');
const trackGenre = document.getElementById('genre');
const trackSoftware = document.getElementById('software');
const trackHardware = document.getElementById('hardware');
const trackInspiration = document.getElementById('inspiration');

let toggleFormStatus = false; // toggle form: open or closed
let toggleSubmitForm; // toggle submit button: add or edit
let indexOfTrackToEdit;
let trackToEdit;

/**  just for testing => **/ const trackTitleFocus = document.querySelector('.trackTitle');

const trackCache = new TrackCache('tracks');
const trackList = new TrackList(trackCache);


// ===== FUNCTIONS ===== //

// display form in a modal window
const displayForm = () => {
  modalContainer.classList.remove('is-hidden')
  addNewTrackBtn.classList.add('is-open');
  toggleFormStatus = true;
  trackTitleFocus.focus(); /** just for testing **/
}

// close/hide form and modal window
const hideForm = () => {
  modalContainer.classList.add('is-hidden');
  addNewTrackBtn.classList.remove('is-open');
  toggleFormStatus = false;
  trackForm.reset();
  printDB();
}

// choose normal card or info card to print it
const makeTrackCard = (track, trackId) => {
  const div = document.createElement('div');
  const wrapper = document.createElement('div');
  if (parseInt(trackId, 10) === parseInt(track.id, 10)) {
    wrapper.innerHTML = makeTrackInfoCardHtml(track);
    // cambiando el innerHTML a pelo podemos perder referencias que hubiera guardadas.
    // Mucho más recomendable que añadas el elemento así para mantener cualquier referencia que tuvieses
    div.append(wrapper.firstElementChild)
    registerEventListeners(div);
  } else {
    wrapper.innerHTML = makeTrackCardHtml(track);
    div.append(wrapper.firstElementChild)
  }

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

// info track buttons: event listeners
const registerEventListeners = (div) => {
  const closeBtn = div.querySelector('.track-info-close-btn');
  const editBtn = div.querySelector('.track-info-edit-btn');
  const deleteBtn = div.querySelector('.track-info-delete-btn');

  closeBtn.addEventListener('click', () => {
    printDB();
  });

  editBtn.addEventListener('click', (e) => {
    toggleSubmitForm = 'edit';
    // No es muy buena idea tirar por cosas tan a piñón como e.path[4]
    const trackId = e.currentTarget.dataset.id;
    trackInfoEditBtn(trackId);
  });

  deleteBtn.addEventListener('click', (e) => { //***
    const trackId = e.currentTarget.dataset.id;
    trackInfoDeleteBtn(trackId);
  });
}

// edit track
const trackInfoEditBtn = (trackId) => {
  displayForm();

  // search in DB which track matches argument
  // el uso con find debería ser buscar algo, no modificar variables.
  indexOfTrackToEdit = trackList.tracks.findIndex((track) => track.id === parseInt(trackId, 10));
  trackToEdit = trackList[indexOfTrackToEdit];
  filledOutEditForm();
}

// auto-filled out form when click on edit track button
const filledOutEditForm = () => {
  const trackEntries = Object.entries(trackToEdit);
  for (const track of trackEntries) {
    switch (track[0]) {
      case 'title':
        trackTitle.value = track[1];
        break;
      case 'genre':
        trackGenre.value = track[1];
        break;
      case 'software':
        trackSoftware.value = track[1];
        break;
      case 'hardware':
        trackHardware.value = track[1];
        break;
      case 'inspiration':
        trackInspiration.value = track[1];
        break;
    }
  }
}

// delete track
const trackInfoDeleteBtn = (trackId) => { //***
                                          // findIndex te devuelve directamente lo que estás buscando
  const indexOfTrackToDelete = trackList.tracks.findIndex((track) => track.id === parseInt(trackId, 10));

  trackList.deleteTrack(indexOfTrackToDelete);
  printDB();
}

// ===== EVENTS ===== //

// click + button to add new tracks
addNewTrackBtn.addEventListener('click', () => {
  toggleSubmitForm = 'add';

  if (!toggleFormStatus) {
    displayForm();
  } else {
    hideForm();
  }
});

// form submit button (add/edit track)
trackForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Dado que ese elemento tiene un id, es más rápido si buscas el elemento por document.getElementById('title');

  if (toggleSubmitForm === 'add') {
    const addOneTrack = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    trackList.addTrack(addOneTrack);
  }

  if (toggleSubmitForm === 'edit') {
    const editOneTrack = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    trackList.editTrack(indexOfTrackToEdit, editOneTrack);
  }

  hideForm();
});

// dropdown: click arow to display track info
myTracksSection.addEventListener('click', (e) => {
  if (e.target.innerText === 'keyboard_arrow_down') {
    printDB(e.path[3].dataset.id);
  }
});

// console.log(e.target.innerText);

// ideal improves:
// ESC key should also close forms
// modal form title when edit: 'New track details' to 'Edit track details'
// style.tranform should be changed by CSS class (classList, add, remove) instead of JS code
// sort out card overflowing text

import {Track} from './Track.js';
// import {TrackList} from './TrackList.js';
// import {TrackCache} from './TrackCache.js';
import {TrackFirebase} from './TrackFirebase.js';
import {makeTrackInfoCardHtml, makeTrackCardHtml} from './templates.js';

// ===== CLASS instances ===== //
// const trackCache = new TrackCache('tracks');
// const trackList = new TrackList(trackCache);
// Firebase
const trackFirebase = new TrackFirebase('track');


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
let idTrackToEdit;
// let indexOfTrackToEdit;
// let trackToEdit;


// ===== FUNCTIONS ===== //

// display form in a modal window
const displayForm = () => {
  modalContainer.classList.remove('is-hidden')
  addNewTrackBtn.classList.add('is-open');
  toggleFormStatus = true;
}

// close/hide form and modal window
const hideForm = () => {
  modalContainer.classList.add('is-hidden');
  addNewTrackBtn.classList.remove('is-open');
  toggleFormStatus = false;
  trackForm.reset();
}

// 
const onGetTrack = (callback) => db.collection('tracks').onSnapshot(callback);

// print track cards
export const printDB = (trackId) => {
  
  onGetTrack((querySnapshot => {
  
    myTracksSection.innerHTML = '';
    
    trackFirebase.getTracks().then((tracks) => {
      tracks.forEach(track => makeTrackCard(track, trackId));
    });
  }));
}

printDB();

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

// info track buttons (event listeners)
const registerEventListeners = (div) => {
  const closeBtn  = div.querySelector('.track-info-close-btn');
  const editBtn   = div.querySelector('.track-info-edit-btn');
  const deleteBtn = div.querySelector('.track-info-delete-btn');

  closeBtn.addEventListener('click', () => {
    printDB();
  });

  editBtn.addEventListener('click', (e) => {
    toggleSubmitForm = 'edit';
    idTrackToEdit = e.currentTarget.dataset.id;
    trackInfoEditBtn(idTrackToEdit);
  });

  deleteBtn.addEventListener('click', (e) => {
    const trackIdToDelete = e.currentTarget.dataset.id;
    trackFirebase.deleteTrack(trackIdToDelete);
    // printDB();
  });
}

// edit track
const trackInfoEditBtn = async () => {
  
  let trackToEdit;
  
  displayForm();

  // search in DB which track matches argument
  await trackFirebase.getTracks().then((tracks) => {
    tracks.find(track => {
      if (track.id === parseInt(idTrackToEdit, 10)) {
        trackToEdit = track;
      }
    });
  })
  .then(() => filledOutEditForm(trackToEdit));
}

// auto-filled out form when click on edit track button
const filledOutEditForm = (trackToEdit) => {
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
  
  if (toggleSubmitForm === 'add') {
    const addOneTrack = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    trackFirebase.addTrack(addOneTrack);
  }

  if (toggleSubmitForm === 'edit') {
    const editOneTrack = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    trackFirebase.editTrack(idTrackToEdit, editOneTrack);
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
// sort out card overflowing text

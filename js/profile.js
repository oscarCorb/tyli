import {Track} from './Track.js';
// import {TrackList} from './TrackList.js';
// import {TrackCache} from './TrackCache.js';
import {TrackFirebase} from './TrackFirebase.js';
import {makeTrackInfoCardHtml, makeTrackCardHtml} from './templates.js';

// import {hideSearchBar} from './search-bar.js';

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
  hideSearchBar();
  setTimeout(() => {
    trackTitle.focus();
  }, 100);
}

// close/hide form and modal window
const hideForm = () => {
  modalContainer.classList.add('is-hidden');
  addNewTrackBtn.classList.remove('is-open');
  toggleFormStatus = false;
  trackForm.reset();
}

// Nota de Fran
/* Lo de snapshot es un manejador de eventos para cuando se producen cambios
 * en el documento en firebase (en su servidor) la razón de que se pinten 2 veces las cosas
 * es que este manejador salta más de una vez cuando se produce una edición (no sé muy bien por qué)
 */
// const onGetTrack = (callback) => db.collection('tracks').onSnapshot(callback);

// print track cards
const printDB = async (trackId) => {
  const myTracks = await trackFirebase.getTracks()
  myTracksSection.innerHTML = '';
  myTracks.forEach(track => makeTrackCard(track, trackId));
  hideSearchBar();
}

printDB();

// choose normal card or info card to print it
const makeTrackCard = (track, trackId) => {

  const div = document.createElement('div');
  const wrapper = document.createElement('div');

  if (parseInt(trackId, 10) === track.id) {
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

  closeBtn.addEventListener('click', async () => {
    await printDB();
  });

  editBtn.addEventListener('click', async (e) => {
    toggleSubmitForm = 'edit';
    idTrackToEdit = e.currentTarget.dataset.id;
    await trackInfoEditBtn(idTrackToEdit);
    await printDB(idTrackToEdit);
  });

  deleteBtn.addEventListener('click', async (e) => {
    const trackIdToDelete = e.currentTarget.dataset.id;
    await trackFirebase.deleteTrack(trackIdToDelete);
    await printDB();
  });
}

// edit track
const trackInfoEditBtn = async () => {
  displayForm();

  // nuevo código de Fran, tengo que adaptarlo
  // const tracks = await trackFirebase.getTracks();
  // const trackIndex = tracks.findIndex(track => track.id === parseInt(idTrackToEdit, 10));
  // trackToEdit = tracks[trackIndex];
  // indexOfTrackToEdit = trackIndex;
  // filledOutEditForm();

  // search in DB which track matches argument
  const tracks = await trackFirebase.getTracks();
  const trackToEdit = tracks.find(track => track.id === parseInt(idTrackToEdit, 10))
  filledOutEditForm(trackToEdit)
  return trackToEdit;
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
trackForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (toggleSubmitForm === 'add') {

    const addOneTrack = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    const track = await trackFirebase.addTrack(addOneTrack);
    await printDB(addOneTrack.id)
  }

  if (toggleSubmitForm === 'edit') {
    const editOneTrack = new Track(trackTitle.value, trackGenre.value, trackSoftware.value, trackHardware.value, trackInspiration.value);
    await trackFirebase.editTrack(idTrackToEdit, editOneTrack);
    await printDB(idTrackToEdit);
  }
  hideForm();
});

// dropdown: click arrow to display track info
myTracksSection.addEventListener('click', async (e) => {
  if (e.target.classList.contains('track-open-btn')) {
    await printDB(e.path[3].dataset.id);
  }
});

export {
  trackFirebase
}

// console.log(e.target.innerText);

// ideal improves:
// ESC key should also close forms
// modal form should be 'New track details' or 'Edit track details'
// sort out card overflowing text



// ===== SEARCH BAR SECTION ===== //
// * * * * mover a oto archivo * * * *

// global variables
const searchButton = document.querySelector('#search');
const searchBar = document.querySelector('#search-bar');
const input = document.querySelector('.search-bar-input');
const form = document.querySelector('.search-form');

// functions

// display search bar when click on loupe button
const displaySearchBar = () => {
    // myTracksSection.innerHTML = '';
    searchBar.classList.remove('is-hidden');
    input.value = '';
    input.focus();
}

// hide search bar when 
const hideSearchBar = () => {
    searchBar.classList.add('is-hidden');
}

const searchTracks = async (searchText) => {

  const tracksMatch = [];
  const myTracks = await trackFirebase.getTracks();

  myTracks.forEach((track) => {
    if (track.title.toLowerCase().includes(searchText)) {
      tracksMatch.push(track);
    } /* else {
      myTracksSection.innerHTML = `
        <div>
          'No matches :('
        </div>
      `;
    } */
  });

  myTracksSection.innerHTML = '';
  tracksMatch.forEach(track => makeTrackCard(track));
}

// events
searchButton.addEventListener('click', () => {
    if (searchBar.classList.contains('is-hidden')) {
      displaySearchBar();
    } else {
        hideSearchBar();
    }
});

form.addEventListener('keyup', (e) => {
  const searchText = e.target.value.toLowerCase();
  searchTracks(searchText);
});

// // Tracks de ejemplo autogenerados para pruebas:
// const track1 = new Track('Digital Tsunami', 'Electronic', 'Cubase', 'Korg Electribe EMX', 'Drexciya');
// const track2 = new Track('Tunnel', 'Minimal Techno', 'Ableton Live 8', 'DS Tempest', 'Richie Hawtin');
// const track3 = new Track('Grey fades to green', 'Techno', 'Ableton Live', 'Access Virus', 'Óscar Mulero');
// const track4 = new Track('Twoism', 'IDM, Ambient', 'FL Studio', 'DS Prophet', 'Boards of Canada');
// const track5 = new Track('Fivo', 'Hard Techno', 'FL Studio', 'Logic Pro', 'Surgeon');
// const track6 = new Track('Fivo', 'Electronic, Ambient', 'Ableton Live', 'Mopho synthesizer', 'Plastikman');
// const track7 = new Track('exHale', 'Electronic, Ambient', 'Ableton Live', 'Mopho synthesizer', 'Plastikman');
// const track8 = new Track('Welcome to the Future', 'Drum & Bass', 'Reaper', 'Moog modular synthesizer', 'Logistics');
// const track9 = new Track('Wayfaring stranger', 'Dubstep', 'Reason', 'Elektron Digitone', 'Burial');
// const track10 = new Track('We are Sheffield', 'Techno, Ambient, IDM', 'Bitwig studio', 'Korg Prologue', 'The Black Dog');

// // funciones
// const cleanTracks = async() => {
//   const myTracks = await trackFirebase.getTracks();
//   myTracks.forEach(track => {
//     trackFirebase.deleteTrack(track.id.toString());
//   });
// }

// const tracksGenerator = async () => {

//   myTracksSection.innerHTML = '';

//   const track_1  = await trackFirebase.addTrack(track1);
//   const track_2  = await trackFirebase.addTrack(track2);
//   const track_3  = await trackFirebase.addTrack(track3);
//   const track_4  = await trackFirebase.addTrack(track4);
//   const track_5  = await trackFirebase.addTrack(track5);
//   const track_6  = await trackFirebase.addTrack(track6);
//   const track_7  = await trackFirebase.addTrack(track7);
//   const track_8  = await trackFirebase.addTrack(track8);
//   const track_9  = await trackFirebase.addTrack(track9);
//   const track_10 = await trackFirebase.addTrack(track10);

//   const myTracks = await trackFirebase.getTracks();
// }

// const tracksGeneratorBtn = document.querySelector('#trackGenerator');

// tracksGeneratorBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   cleanTracks();
//   tracksGenerator();
// });

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

// *** ESTO LO HE COPIADO Y NO LO ENTIENDO DEL TODO BIEN ***
//
/* Lo de snapshot es un manejador de eventos para cuando se producen cambios
 * en el documento en firebase (en su servidor) la razón de que se pinten 2 veces las cosas
 * es que este manejador salta más de una vez cuando se produce una edición (no sé muy bien por qué)
 **/
const onGetTrack = (callback) => db.collection('tracks').onSnapshot(callback);

// print track cards

  // *** ESTO TAMBIÉN. El caso es que sin esta línea no se imprimen
  // *** los nuevos tracks en pantalla, hay que recargar el navegador
const printDB = async (trackId) => {
  const myTracks = await trackFirebase.getTracks()
  myTracksSection.innerHTML = '';
  myTracks.forEach(track => makeTrackCard(track, trackId));
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

  // código de Fran, tengo que adaptarlo
  // const tracks = await trackFirebase.getTracks();
  // const trackIndex = tracks.findIndex(track => track.id === parseInt(idTrackToEdit, 10));
  // trackToEdit = tracks[trackIndex];
  // indexOfTrackToEdit = trackIndex;
  // filledOutEditForm();

  // search in DB which track matches argument
  const tracks = await trackFirebase.getTracks()
  const trackToEdit = tracks.find(track => track.id === parseInt(idTrackToEdit, 10))
  filledOutEditForm(trackToEdit)
  return trackToEdit;
}

// auto-filled out form when click on edit track button
const filledOutEditForm = (trackToEdit) => {
  const trackEntries = Object.entries(trackToEdit);
  console.log(trackEntries)
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

// console.log(e.target.innerText);

// ideal improves:
// ESC key should also close forms
// modal form should be 'New track details' or 'Edit track details'
// sort out card overflowing text

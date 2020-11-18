// esta importación realmente no sé si es necesaria
// import {TrackCache} from "./TrackCache.js";
// import {printDB} from './profile.js';

export class TrackFirebase {

    constructor(track) {

        this.track  = track;
        // this.tracks = this.getTracks();
    }
    
    // get tracks from Firebase
    getTracks() {
        return db.collection('tracks').get().then((snapshot) => snapshot.docs.map(doc => doc.data()));
    }
    
    // add track to Firebase
    addTrack(track) {
        
        let id = (track.id).toString();

        return db.collection('tracks').doc(id).set({
            title:       track.title,
            genre:       track.genre,
            software:    track.software,
            hardware:    track.hardware,
            inspiration: track.inspiration,
            id:          track.id,
            creation:    track.creation,
        });
    }

    // delete track from Firebase
    deleteTrack(trackId) {
        return db.collection('tracks').doc(trackId).delete();
    }

    // update track in Firebase
    editTrack(id, trackValues) {

        return db.collection('tracks').doc(id).update({
            title:       trackValues.title,
            genre:       trackValues.genre,
            software:    trackValues.software,
            hardware:    trackValues.hardware,
            inspiration: trackValues.inspiration,
        });
    }
}
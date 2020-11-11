
import { TrackCache } from "./TrackCache.js";

export class TrackList {

    constructor(cache) {

        this.cache = cache;
        this.tracks = cache.getLocalStorage();
    }

    addTrack(track) {
        this.tracks = [track, ...this.tracks];
		this.cache.saveLocalStorage(this.tracks);
		return this.tracks;
    }
    
    editTrack(index, track) {
        // Cuando se edita algo SIEMPRE indicar 1º qué y luego el contenido
		this.tracks = [...this.tracks.splice(index, 1, track)];
		this.cache.saveLocalStorage(this.tracks);
		return this.tracks;
	}
}

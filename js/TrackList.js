
export class TrackList {

  constructor(cache) {
    this.cache = cache;
    this.tracks = cache.getLocalStorage();
  }

  // add track to local storage
  addTrack(track) {
    this.tracks = [track, ...this.tracks];
    this.cache.saveLocalStorage(this.tracks);
    return this.tracks;
  }

  editTrack(index, track) {
    // Consejo Fran: Cuando se edita algo SIEMPRE indicar qué se borra y luego el contenido
    this.tracks.splice(index, 1, track);
    this.cache.saveLocalStorage(this.tracks);
    return this.tracks;
  }

  deleteTrack(index) {
    this.tracks.splice(index, 1)
    this.cache.saveLocalStorage(this.tracks);
    return this.tracks;
  }
}

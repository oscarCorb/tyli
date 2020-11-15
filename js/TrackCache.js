export class TrackCache {

  constructor(clave) {
    this.clave = clave;
  }

  getLocalStorage() {
    return localStorage.getItem(this.clave)
      ? JSON.parse(localStorage.getItem(this.clave))
      : [];
  }

  saveLocalStorage(tracks) {
    localStorage.setItem(this.clave, JSON.stringify(tracks));
  }
}

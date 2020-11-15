export class Track {

  constructor(title, genre, software, hardware, inspiration) {

    this.title = title;
    this.genre = genre;
    this.software = software;
    this.hardware = hardware;
    this.inspiration = inspiration;

    this.id = new Date().getTime();
    this.creation = new Date();
  }
}

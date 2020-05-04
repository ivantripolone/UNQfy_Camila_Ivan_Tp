module.exports = class Track {
  constructor(albumId, name, duration, genres) {
    this.id = Math.floor(Math.random() * 100);
    this.name = name;
    this.duration = duration;
    this.genres = genres;
    this.albumId = albumId;
  }
};
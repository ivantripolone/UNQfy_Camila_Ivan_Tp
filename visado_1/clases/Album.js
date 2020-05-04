module.exports = class Album {
  constructor(artistId,name, year) {
    this.id = Math.floor(Math.random() * 100);
    this.name = name;
    this.year = year;
    this.artistId= artistId;
  }
};
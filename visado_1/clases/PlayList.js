module.exports = class PlayList {
  constructor(name, genres, maxDuration) {
    this.id = Math.floor(Math.random() * 100);
    this.name = name;
    this.genres = genres;
    this.maxDuration = maxDuration;
    this.tracks= [];
  }
  addTracks(tracksByGenre){
    for (let i = 0; i < tracksByGenre.length; i++) {
        if(this.maxDuration < tracksByGenre[i].duration){
            break;
        }
        this.tracks.push(tracksByGenre[i]);
        this.maxDuration = this.maxDuration - tracksByGenre[i].duration;
    }
    return this.tracks.length;
  }
}
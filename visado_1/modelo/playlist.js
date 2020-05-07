module.exports = class PlayList {
  constructor(name, genres, maxDuration,id) {
    this.id =id;
    this.name = name;
    this.genres = genres;
    this.maxDuration = maxDuration;
    this.tracks= [];
  }
  addTracks(tracksByGenre){
    let duration=this.maxDuration;
    for (let i = 0; i < tracksByGenre.length; i++) {
      if(duration >= tracksByGenre[i].getduration()  ){
        this.tracks.push(tracksByGenre[i]); 
        duration = duration - tracksByGenre[i].getduration();
      }
      
    }
    return this.tracks.length;
  }
  duration(){
    return this.maxDuration;
  }
  hasTrack(track){ 
    return this.tracks.includes(track);
  }
}
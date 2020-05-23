const trackAlreadyExistsError= require('./errores/trackAlreadyExistsError');
const trackDoesNotExistError= require('./errores/trackDoesNotExistError');

module.exports = class Album {
  constructor(name, year,id) {
    this._id = id ;
    this._name = name;
    this._year = year;
    this._tracks = [];
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get tracks(){
    return this._tracks;
  }
  get year(){
    return this._year;
  }
  addtrack(track) {
    if(this._tracks.find(t=>t.name === track.name)){
      throw new trackAlreadyExistsError;
    }
    else{
      this._tracks.push(track);
    }
    
    return track;
  }
  removeTrack(nameTrack){
    const myTrack =this.tracks.find(t=>t.name === nameTrack);
    if(myTrack){
      const index= this.tracks.indexOf(myTrack);
      this.tracks.splice(index , 1);
      return myTrack;   
    }
    else{
      throw new trackDoesNotExistError;
    }
  }

};
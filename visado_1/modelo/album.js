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

  addtrack(track) {
    if(this._tracks.find(t=>t.name === track.name)){
      throw new trackAlreadyExistsError;
    }
    else{
      this._tracks.push(track);
    }
    
    return this._tracks.find(t => t._id === track._id);
  }
  removeTrack(nameTrack){
    const myAlbum =this.tracks.find(t=>t.name === nameTrack);
    if(myAlbum){
      const index= this.tracks.indexOf(myAlbum);
      this.tracks.splice(index , 1);
      return myAlbum;   
    }
    else{
      throw new trackDoesNotExistError;
    }
  }

};
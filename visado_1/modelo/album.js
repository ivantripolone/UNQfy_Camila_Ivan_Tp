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
    this._tracks.push(track);
    return this._tracks.find(t => t._id === track._id);
  }

};
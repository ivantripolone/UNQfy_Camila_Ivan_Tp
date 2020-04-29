
module.exports= class Artist{

  constructor(name,country){
    this._id= Math.floor(Math.random()*100);
    this._name=name;
    this._country=country;
    this._albums= [];
  }
  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }

  get country(){
    return this.country;
  }

  addAlbum(album){
    this._albums.push(album);
  }

  get albums(){
    return this._albums;
  }


};


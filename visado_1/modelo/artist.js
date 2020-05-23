const albumAlreadyExistsError= require('./errores/AlbumAlreadyExistsError');
const albumDoesNotExistError= require('./errores/AlbumDoesNotExistError');


module.exports= class Artist{
  constructor(name,country,id)
  {
    this._id=id;
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
    return this._country;
  }
  get albums(){
    return this._albums;
  }
  addAlbum(album){
    if(this.albums.find(a=>a.name === album.name)){
      throw new albumAlreadyExistsError;
    }
    else{
      this._albums.push(album);
      return album;
    }
  }
  removeAlbum(nameAlbum){
    const myAlbum =this.albums.find(a=>a.name === nameAlbum);
    if(myAlbum){
      const index= this.albums.indexOf(myAlbum);
      this.albums.splice(index , 1);
      return myAlbum;   
    }
    else{
      throw new albumDoesNotExistError;
    }
  }
};

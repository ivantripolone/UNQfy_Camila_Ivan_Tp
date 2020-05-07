
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const artist = require("./modelo/artist.js");
const album = require("./modelo/album.js");
const track = require("./modelo/track.js");
const playList=require("./modelo/playlist");
const artistExistError = require('./modelo/errores/ArtistAlreadyExistsError');
const artistDoesNotExistError =require("./modelo/errores/ArtistDoesNotExistError.js");
const albumDoesNotExistError = require("./modelo/errores/AlbumDoesNotExistError.js");
const trackDoesNotExistError = require("./modelo/errores/trackDoesNotExistError.js");
const playlistDoesNotExistError = require("./modelo/errores/playlistDoesNotExistError");
const playListAlreadyExistsError = require("./modelo/errores/PlayListAlreadyExistsError");

class UNQfy {

  constructor(){
    this._artists= [];
    this.playlists= [];
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
    /* Crea un artista y lo agrega a unqfy.qqqq
    El objeto artista creado debe soportar (al menos):
      - una propiedad name (string)
      - una propiedad country (string)
    */
    if (this._artists.find(artist => artist._name === artistData.name))
    {
      throw new artistExistError;
    }
    else {
      const newArtist = new artist(artistData.name, artistData.country,this._artists.length+1); 
      this._artists.push(newArtist);
      return this._artists.find(artist => artist._id === newArtist._id);
    }
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    const newAlbum = new album (albumData.name, albumData.year,this.getAlbums().length +1);
    try {this.getArtistById(artistId).addAlbum(newAlbum);
      return this.getAlbumById(newAlbum._id);
    }
    catch(e){
      console.log('this album cannot be added because'+e.message);
    }
  
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */

    const newTrack = new track(trackData.name, trackData.duration, trackData.genres, this.getTracks().length +1);
    try {
      return this.getAlbumById(albumId).addtrack(newTrack);
    }
    catch(e){
      console.log('this album cannot be added because'+e.message);
    } 
    
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAlbumById(id) {
    const album = this.getAlbums().find(album => album.id === id);
    if(album !== undefined){
      return album;
    } else{
      throw new albumDoesNotExistError;
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getArtistById(id) {
    if((this._artists.find(artist=> artist.id===id) === undefined )){
      throw new artistDoesNotExistError;
    }
    else{
      return (this._artists.find(artist => artist.id === id));
    }
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getArtist(){
    return this._artists;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAlbums(){
    return this._artists.reduce((total,amount)=> {
      amount.albums.forEach( album => {
        total.push(album);
      })
      return total;
    }, []);  
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getTracks(){
    return this.getAlbums().reduce((total,amount)=> {
      amount._tracks.forEach( track => {
        total.push(track);
      })
      return total;
    }, []);
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getTrackById(id) {
    const track = this.getTracks().find(track => track.id === id);
    if(track !== undefined){
      return track;
    } else{
      throw new trackDoesNotExistError;
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getPlaylistById(id) {
    if((this.playlists.find(playlist=> playlist.id===id) === undefined )){
      throw new playlistDoesNotExistError;
    }
    else{
      return (this.playlists.find(playlist => playlist.id === id));
    }


  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {

    return this.getTracks().filter( t =>this.containsTrack(t,genres));
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  containsTrack(track,genres){
    const genresOfTrack= track.genres;
    for (let i = 0; i < genres.length; i++) {
      if(genresOfTrack.includes(genres[i])){
        return true;
      } 
    }
    return false;
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  myAlbumsById(idArtist){
    const albums =this.getArtistById(idArtist)._albums;
    return albums;
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 myTracksById(idArtist){
    return this.myAlbumsById(idArtist).reduce((total,amount)=> {
      amount._tracks.forEach( track => {
        total.push(track);
      })
      return total;
    }, []);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    const artist= this._artists.find(a=> a.name === artistName.name);
    if(artist){
      return this.myTracksById(artist.id);
    }else  throw new artistDoesNotExistError;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
    const newPlayList = new playList(name,genresToInclude,maxDuration,this.playlists.length +1);
    if (this.playlists.find(p => p.name === newPlayList.name)) {
      throw new playListAlreadyExistsError;
    }else {
      const tracksByGenre = this.getTracksMatchingGenres(genresToInclude);      
      newPlayList.addTracks(tracksByGenre);
      this.playlists.push(newPlayList);
      return this.playlists.find(p=> p.id === newPlayList.id);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

searchByName('Roses'){
  
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  save(filename) {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy,artist , album , track , playList , artistExistError , artistDoesNotExistError , albumDoesNotExistError,
      trackDoesNotExistError , playlistDoesNotExistError , playListAlreadyExistsError];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy/*, artist , album , track , playList , artistExistError , artistDoesNotExistError , albumDoesNotExistError,
  trackDoesNotExistError , playlistDoesNotExistError , playListAlreadyExistsError
  */
};



const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const artist = require("./clases/Artist.js");
const album = require("./clases/Album.js");
const track = require("./clases/Track.js");
const playList = require("./clases/PlayList.js");

class UNQfy {
  constructor(){
    this.artists = [];
    this.playLists= [];
    this.albums= [];
    this.tracks= [];
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData){
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    const newArtist = new artist(artistData.name, artistData.country);
    if (this.artists.find(a => a.name === newArtist.name && a.country === newArtist.country)) {
    //throw new Error;
    } else {
      this.artists.push(newArtist);
      return this.artists.find(a=> a.id === newArtist.id);
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    const artist= this.getArtistById(artistId);
    const newAlbum= new album(artist.id,albumData.name, albumData.year)
    if(this.albums.find(a => a.name === newAlbum.name && a.artistId === newAlbum.artistId)){
      //throw new Error;
    }else {
      this.albums.push(newAlbum);
      return this.albums.find(a=> a.id === newAlbum.id);
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    const album = this.getAlbumById(albumId);
    const newTrack= new track(album.id,trackData.name,trackData.duration, trackData.genres);
    if(this.tracks.find(t => t.albumId === newTrack.albumId && t.name === newTrack.name)){
      //throw new Error;
    }else{
      this.tracks.push(newTrack);
      return this.tracks.find(a=> a.id === newTrack.id);
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getArtistById(id) {
    const artist= this.artists.find(a=> a.id === id);
    if(artist){
      return artist;
    }else{
      //return new Error;
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAlbumById(id) {

    const album= this.albums.find(a=> a.id === id);
    if(album){
      return album
    }else{
      //return new Error;
    }
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getTrackById(id) {
    const track= this.albums.find( t=> t.id === id);
    if(track){
      return track
    }else{
      //return new Error;
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getPlaylistById(id) {
    const playlist= this.playLists.find( p=> p.id === id);
    if(playlist){
      return playlist;
    }else{
      //return new Error;
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    return this.tracks.filter( t=>this.containsTrack(t,genres));
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

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    const artist= this.artists.find(a=> a.name === artistName.name);
    if(artist){
      const albums= this.albums.filter(a=> a.artistId === artist.id);
      return this.tracks.filter(t=>this.isMyTracks(t,albums));
    }else return [];
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  isMyTracks(track,albums){
    for (let i = 0; i < albums.length; i++) {
      if(albums[i].id === track.albumId){
        return true;
      } 
    }
    return false;
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

    const newPlayList = new playList(name,genresToInclude,maxDuration);
    if (this.playLists.find(p => p.name === newPlayList.name)) {
      //throw new Error;
    } else {
      const tracksByGenre = this.getTracksMatchingGenres(genresToInclude);      
      newPlayList.addTracks(tracksByGenre);
      this.playLists.push(newPlayList);
      return this.playLists.find(p=> p.id === newPlayList.id);
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  searchByName(name) {
    return this.playLists.find(
      function (playList) {
        return playList.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
      })
  }

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
    const classes = [UNQfy];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};




const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function addArtist(artistName, country){
  const artistData= { name: artistName,country: country };
  const unqfy= getUNQfy();
  
  console.log(unqfy.addArtist(artistData));
  
  saveUNQfy(unqfy);
}
function getArtist(){
  const unqfy= getUNQfy();
  console.log(unqfy.getArtist());
  saveUNQfy(unqfy);
}
function addAlbum(artistId,nameAlbum,yearAlbum){
  const albumData = {name: nameAlbum , year: parseInt(yearAlbum,10) };
  const unqfy = getUNQfy();
  console.log(unqfy.addAlbum(parseInt(artistId,10),albumData));
  saveUNQfy(unqfy);
}
function removeAlbum(artistId,nameAlbum){
  const unqfy = getUNQfy();
  console.log(unqfy.removeAlbum(parseInt(artistId,10),nameAlbum));
  saveUNQfy(unqfy);
}
function getAlbums(){
  const unqfy= getUNQfy();
  console.log(unqfy.getAlbums());
  saveUNQfy(unqfy);
}
function addTrack(albumId,trackName, trackDuraction, trackGenres){
  const trackData = { name: trackName, duration: parseInt(trackDuraction,10), genres: trackGenres.split(" ") };
  const unqfy = getUNQfy();
  console.log(unqfy.addTrack(parseInt(albumId,10),trackData));
  saveUNQfy(unqfy);
}
function removeTrack(albumId,nameTrack){
  const unqfy = getUNQfy();
  console.log(unqfy.removeTrack(parseInt( albumId ,10),nameTrack));
  saveUNQfy(unqfy);
}
function getTracks(){
  const unqfy= getUNQfy();
  console.log(unqfy.getTracks());
  saveUNQfy(unqfy);
}

function main() {
 
  if(process.argv[2]=== 'addArtist')
    addArtist(process.argv[3],process.argv[4]);
  if(process.argv[2]=== 'getArtists')
    getArtist();
  if(process.argv[2]=== 'addAlbum')
    addAlbum(process.argv[3],process.argv[4],process.argv[5]);
  if(process.argv[2]=== 'removeAlbum')
    removeAlbum(process.argv[3],process.argv[4]);
  if(process.argv[2]=== 'getAlbums')
    getAlbums();
  if(process.argv[2]=== 'addTrack')
    addTrack(process.argv[3],process.argv[4],process.argv[5],process.argv[6]);
  if(process.argv[2]=== 'removeTrack')
    removeTrack(process.argv[3],process.argv[4]);
    if(process.argv[2]=== 'getTracks')
    getTracks();
  //process.argv.forEach(argument => console.log(argument));
    
}

main();

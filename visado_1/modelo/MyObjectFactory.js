const artist = require("./artist.js");
const album = require("./album.js");
const track = require("./track.js");

module.exports = class MyObjectFactory {
    constructor() {
        this.nextId = 1;
    }

    static createArtist(name, country) {
        const newArtist = new artist(name, country, this.nextId++);
        return newArtist;
    }

    static createAlbum(name, year) {
        const newAlbum = new album(name, year, this.nextId++);
        return newAlbum;
    }

    static createTrack(name, duration, genres) {
        const newTrack = new track(name, duration,genres, this.nextId++);
        return newTrack;
    }
}


  
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { Track } from 'src/interface/interface';

const db = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  getAll() {
    return db;
  }
  addTrackToFavs(id: string): Track {
    const track = this.trackService.checkTrackById(id);
    if (track) {
      db.tracks.push(track);
      return track;
    } else {
      throw new UnprocessableEntityException();
    }
  }

  deleteTrackFromFavs(id: string) {
    const track = this.trackService.checkTrackById(id);
    if (track) {
      db.tracks = db.tracks.filter((track) => {
        return track.id !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
  addAlbumToFavs(id: string) {
    const album = this.albumService.checkAlbumById(id);
    if (album) {
      db.albums.push(album);
      return album;
    } else {
      throw new UnprocessableEntityException();
    }
  }
  deleteAlbumFromFavs(id: string) {
    const album = this.albumService.checkAlbumById(id);
    if (album) {
      db.albums = db.albums.filter((album) => {
        return album.id !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
  addArtistToFavs(id: string) {
    const artist = this.artistService.checkArtistById(id);
    if (artist) {
      db.artists.push(artist);
      return artist;
    } else {
      throw new UnprocessableEntityException();
    }
  }
  deleteArtistFromFavs(id: string) {
    const artist = this.artistService.checkArtistById(id);
    if (artist) {
      db.artists = db.artists.filter((artist) => {
        return artist.id !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../interface/interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];
  getArtists() {
    return this.artists;
  }
  getArtistById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('User not found');
    }
    return artist;
  }
  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }
  updateArtist(updateArtistDto: UpdateArtistDto, id: string) {
    const artist = this.getArtistById(id);
    const artistIdx = this.getArtistIdx(id);
    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }
    const updateArtist = {
      ...artist,
      ...updateArtistDto,
    };
    this.artists[artistIdx] = updateArtist;
    return updateArtist;
  }

  getArtistIdx(id: string): number {
    const artistIdx = this.artists.findIndex((artist) => id === artist.id);
    if (artistIdx != -1) {
      return artistIdx;
    }
    throw new NotFoundException('Artist not found');
  }

  deleteArtist(id: string) {
    const user = this.getArtistIdx(id);
    this.artists.splice(user, 1);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/interface/interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];
  getAlbums() {
    return this.albums;
  }
  getAlbumById(id: string): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }
  updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string) {
    const album = this.getAlbumById(id);
    const albumIdx = this.getAlbumIdx(id);
    if (!album) {
      throw new NotFoundException('Album not found!');
    }
    const updateAlbum = {
      ...album,
      ...updateAlbumDto,
    };
    this.albums[albumIdx] = updateAlbum;
    return updateAlbum;
  }

  getAlbumIdx(id: string): number {
    const albumIdx = this.albums.findIndex((album) => id === album.id);
    if (albumIdx != -1) {
      return albumIdx;
    }
    throw new NotFoundException('Album not found');
  }

  deleteAlbum(id: string) {
    const album = this.getAlbumIdx(id);
    this.albums.splice(album, 1);
  }
}

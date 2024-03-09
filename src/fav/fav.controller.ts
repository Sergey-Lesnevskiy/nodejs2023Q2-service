import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { FavsService } from './fav.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @Get()
  @HttpCode(200)
  getAll() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addTrackToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.deleteTrackFromFavs(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.deleteAlbumFromFavs(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favsService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.deleteArtistFromFavs(id);
  }
}

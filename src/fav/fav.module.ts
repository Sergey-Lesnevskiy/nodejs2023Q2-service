import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { FavsController } from './fav.controller';
import { FavsService } from './fav.service';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    TrackService,
    AlbumService,
    TrackService,
    ArtistService,
  ],
})
export class FavsModule {}

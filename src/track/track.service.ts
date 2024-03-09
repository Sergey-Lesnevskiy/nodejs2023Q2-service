import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/interface/interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];
  getTracks() {
    return this.tracks;
  }
  getTrackById(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }
  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }
  updateTrack(UpdateTrackDto: UpdateTrackDto, id: string) {
    const track = this.getTrackById(id);
    const trackIdx = this.getTrackIdx(id);
    if (!track) {
      throw new NotFoundException('Track not found!');
    }
    const updateTrack = {
      ...track,
      ...UpdateTrackDto,
    };
    this.tracks[trackIdx] = updateTrack;
    return updateTrack;
  }

  getTrackIdx(id: string): number {
    const trackIdx = this.tracks.findIndex((artist) => id === artist.id);
    if (trackIdx != -1) {
      return trackIdx;
    }
    throw new NotFoundException('Track not found');
  }

  deleteTrack(id: string) {
    const user = this.getTrackIdx(id);
    this.tracks.splice(user, 1);
  }
}

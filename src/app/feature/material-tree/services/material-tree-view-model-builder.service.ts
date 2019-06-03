import {Injectable} from '@angular/core';
import {DeviceController, Room, RoomBasic} from '../types/room.type';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RoomService} from './room.service';
import {DevicesService} from './devices.service';

interface RoomWithControllers extends RoomBasic {
  controllers?: DeviceController[];
}

export type MaterialTreeViewModel = RoomWithControllers;

@Injectable({
  providedIn: 'root'
})
export class MaterialTreeViewModelBuilderService {

  constructor(
    private roomService: RoomService,
    private devicesService: DevicesService
  ) {
  }

  buildForRooms(rooms: Room[]): Observable<MaterialTreeViewModel[]> {
    return this.getControllersByRoom(this.getRooms(rooms))
      .pipe(
        map((r: MaterialTreeViewModel[]) => this.filterRoomsByAvailableControllers(r)),
      );
  }

  private getRooms(rooms: Room[]): RoomBasic[] {
    return rooms.map(({id, name}) => ({id, name}));
  }

  private getControllersByRoom(rooms: RoomBasic[]): Observable<MaterialTreeViewModel[]> {
    return forkJoin(
      rooms.map((room: RoomBasic) => {
        return this.devicesService.getControllersByRoom(room.id)
          .pipe(
            map((controllers: DeviceController[]) => ({
              ...room,
              controllers
            } as MaterialTreeViewModel))
          );
      })
    );
  }

  private filterRoomsByAvailableControllers(rooms: RoomWithControllers[]): RoomWithControllers[] {
    return rooms.filter((room: RoomWithControllers) => room.controllers.length);
  }
}

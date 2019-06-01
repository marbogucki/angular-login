import { Component, OnInit } from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {DeviceController, Room, RoomBasic, RoomWithControllers} from './types/room.type';
import {RoomService} from './services/room.service';
import {DevicesService} from './services/devices.service';
import {NestedTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-material-tree',
  templateUrl: './material-tree.component.html',
  styleUrls: ['./material-tree.component.scss']
})
export class MaterialTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<any>(node => node.bindings);
  rooms: RoomWithControllers[] = null;

  constructor(
    private roomService: RoomService,
    private devicesService: DevicesService
  ) {}

  ngOnInit() {
    this.getControllers();
  }

  hasChild = (_: number, node: any) => !!node.bindings;

  getControllers() {
    this.roomService.getRooms()
      .pipe(
        map((rooms: Room[]) => this.getRooms(rooms)),
        switchMap((rooms: RoomBasic[]) => this.getRoomsWithControllers(rooms)),
        map((rooms: RoomWithControllers[]) => this.filterRoomsByAvailableControllers(rooms)),
      ).subscribe(
      (data: RoomWithControllers[]) => {
        this.rooms = data;
        console.log(data);
      }
    );
  }

  private getRooms(rooms: Room[]): RoomBasic[] {
    return rooms.map(({ id, name }) => ({ id, name }));
  }

  private getRoomsWithControllers(rooms: RoomBasic[]): Observable<RoomWithControllers[]> {
    return rooms.length ? this.getControllersByRoom(rooms) : of([]);
  }

  private getControllersByRoom(rooms: RoomBasic[]): Observable<RoomWithControllers[]> {
    return forkJoin(
      rooms.map((room: RoomBasic) => {
        console.log(room);
        return this.devicesService.getControllersByRoom(room.id)
          .pipe(
            map((controllers: DeviceController[]) => {
              room['controllers'] = controllers;
              return room;
            })
          );
      })
    );
  }

  private filterRoomsByAvailableControllers(rooms: RoomWithControllers[]): RoomWithControllers[] {
    return rooms.filter((room: RoomWithControllers) => room.controllers.length);
  }
}

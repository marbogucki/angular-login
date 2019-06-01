import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from "../types/room.type";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  constructor(private http: HttpClient) { }

  getControllersByRoom(roomId: number) {
    return this.http.get<Room[]>(`${environment.apiURL}/controllers?roomId=${roomId}`);
  }
}

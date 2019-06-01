import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeviceController} from '../types/room.type';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  constructor(private http: HttpClient) { }

  getControllersByRoom(roomId: number): Observable<DeviceController[]> {
    return this.http.get<DeviceController[]>(`${environment.apiURL}/controllers?roomId=${roomId}`);
  }
}

export interface RoomBasic {
  id: number;
  name: string;
}

export interface Room extends RoomBasic {
  floor: string;
  devices: number[];
}

export interface RoomWithControllers extends RoomBasic {
  controllers?: DeviceController[];
}

export interface DeviceController {
  id: number;
  name: string;
  model: string;
  roomId: number;
  bindings: DeviceControllerBinding[];
}

export interface DeviceControllerBinding {
  channel: string;
  action: string;
  result: string;
}

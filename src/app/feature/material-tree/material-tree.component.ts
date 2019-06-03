import {Component} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {RoomService} from './services/room.service';
import {MaterialTreeViewModel, MaterialTreeViewModelBuilderService} from './services/material-tree-view-model-builder.service';

@Component({
  selector: 'app-material-tree',
  templateUrl: './material-tree.component.html',
  styleUrls: ['./material-tree.component.scss']
})
export class MaterialTreeComponent {
  treeControl = new NestedTreeControl<any>(node => node.bindings);
  rooms$: Observable<MaterialTreeViewModel[]> = this.getControllers$();

  constructor(
    private roomService: RoomService,
    private materialTreeViewModelBuilderService: MaterialTreeViewModelBuilderService
  ) {
  }

  hasChild = (_: number, node: any) => !!node.bindings;

  getControllers$(): Observable<MaterialTreeViewModel[]> {
    return this.roomService.getRooms()
      .pipe(
        switchMap(rooms => this.materialTreeViewModelBuilderService.buildForRooms(rooms))
      );
  }
}

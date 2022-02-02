import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GridStack, GridStackWidget } from 'gridstack';
import 'gridstack/dist/h5/gridstack-dd-native';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public grid1: GridStack;
  public grid2: GridStack;

  ngAfterViewInit(): void {
    const options = {
      column: 3,
      minRow: 1, // don't collapse when empty
      cellHeight: 50,
      disableOneColumnMode: true,
      float: false,
      // dragIn: '.sidebar .grid-stack-item', // add draggable to class
      // dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' }, // clone
      removable: '.trash', // true or drag-out delete class
      acceptWidgets: () => true // function example, but can also be: true | false | '.someClass' value
    };


    GridStack.setupDragIn('.sidebar .grid-stack-item', {
      revert: 'invalid',
      scroll: false,
      appendTo: 'body',
      helper: this.handleDrop.bind(this) as any
    });

    const grids = GridStack.initAll(options);
    this.grid1 = grids[0];
    this.grid2 = grids[1];

    const serializedData: GridStackWidget[] = [
      { x: 0, y: 1, w: 1, h: 0, content: 'Number' },
      { x: 0, y: 1, w: 1, h: 0, content: 'Multimedia' },
      { x: 0, y: 1, w: 1, h: 0, content: 'Text' },
      { x: 0, y: 1, w: 1, h: 0, content: 'Date & Time' },

      { x: 1, y: 1, w: 1, h: 0, content: 'Number' },
      { x: 1, y: 1, w: 1, h: 0, content: 'Multimedia' },
      { x: 1, y: 1, w: 1, h: 0, content: 'Text' },
      { x: 1, y: 1, w: 1, h: 0, content: 'Date & Time' },

      { x: 2, y: 1, w: 1, h: 0, content: 'Number' },
      { x: 2, y: 1, w: 1, h: 0, content: 'Multimedia' },
      { x: 2, y: 1, w: 1, h: 0, content: 'Text' },
      { x: 2, y: 1, w: 1, h: 0, content: 'Date & Time' },
    ];

    this.grid1.load(serializedData);
    this.grid2.load(serializedData);
  }

  handleDrop(event: any): void {
    return event.target.cloneNode(true);
  }
}

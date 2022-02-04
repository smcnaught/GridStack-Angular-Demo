import { AfterViewInit, Component } from '@angular/core';
import { GridItemHTMLElement, GridStack, GridStackNode, GridStackOptions, GridStackWidget } from 'gridstack';
import 'gridstack/dist/h5/gridstack-dd-native';

export type WidgetEvent = GridItemHTMLElement | GridStackNode | GridStackNode[] | undefined;
export type XenonWidgetTypes = 'Number' | 'Multimedia' | 'Text' | 'Date & Time';

(<any>window).gridJSContext = {
  select: () => {},
  enable: () => {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public formGrid: GridStack;

  ngAfterViewInit(): void {
    this.setupGrids();
  }

  public selectWidget(event: PointerEvent): void {
    const widget = event.target as any;
    const xenonID = widget.getAttribute('data-xenonID');
    console.log(xenonID)
  }

  private setupGrids(): void {
    this.setupFormBuilder();
    this.setupGridListeners();
  }

  private setupGridListeners(): void {
    this.formGrid.on('dragstop', (event: Event, element: WidgetEvent) => {
      if (element) {
        const movedElement = element as any;
        const type: XenonWidgetTypes = movedElement.textContent
        let droppedNode = movedElement.gridstackNode;
        let newX = movedElement.getAttribute('gs-x'); // verify node (easiest) and attr are the same
        let newY = movedElement.getAttribute('gs-y');
        console.log('dragstop ' + type + ' pos: (' + droppedNode.x + ',' + droppedNode.y + ') = (' + newX + ',' + newY + ')');
      }
    });

    this.formGrid.on('dropped', (event: Event, removedWidget: WidgetEvent, newWidget: WidgetEvent) => {
      // if (removedWidget) {
      //   console.log(`Widget was removed from grid ${(<GridStackNode>removedWidget).el?.id}`)
      // }
      if (newWidget) {
        const type = (<GridStackNode>newWidget).el?.innerText as XenonWidgetTypes;
        console.log(`New widget was added: ${type}`);
        (<any>newWidget).el.onclick = this.selectWidget;



        /**
         * TODO - MONDAY STEPHANIE - 
         * This attribute is NOT being set for new widgets. 
         * It's being set, but doesn't show up when clicked (in the 'selectWidget' method).
         */
        (<any>newWidget).el.setAttribute('data-xenonID', 'a new generated id!');







        
      }
    })
  }

  private setupFormBuilder(): void {
    const options: GridStackOptions = {
      column: 3,
      minRow: 1, // don't collapse when empty
      cellHeight: 50,
      disableOneColumnMode: true,
      float: false,
      disableResize: true,
      // dragIn: '.sidebar .grid-stack-item', // add draggable to class
      // dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' }, // clone
      removable: '.trash', // true or drag-out delete class
      acceptWidgets: () => true // allow dropping inside form grid.
    };

    GridStack.setupDragIn('.sidebar .grid-stack-item', {
      revert: 'invalid',
      scroll: false,
      appendTo: 'body',
      helper: this.handleDrop.bind(this) as any,
    });

    this.formGrid = GridStack.init(options);    

    (<any>window).gridJSContext.select = this.selectWidget;
    const serializedData: GridStackWidget[] = [
      { x: 0, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='A unique id that we can use later...'>Number</div>" },
      { x: 0, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='1'>Multimedia</div>" },
      { x: 0, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='2'>Text</div>" },
      { x: 0, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='3'>Date & Time</div>" },

      { x: 1, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='11'>Number</div>" },
      { x: 1, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='22'>Multimedia</div>" },
      { x: 1, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='33'>Text</div>" },
      { x: 1, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='44'>Date & Time</div>" },

      { x: 2, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='111'>Number</div>" },
      { x: 2, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='222'>Multimedia</div>" },
      { x: 2, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='333'>Text</div>" },
      { x: 2, y: 1, w: 1, h: 0, content: "<div onclick='gridJSContext.select(event)' data-xenonID='444'>Date & Time</div>" },
    ];

    this.formGrid.load(serializedData);
  }

  private handleDrop(event: DragEvent): void {
    return (<any>event).target.cloneNode(true);
  }
}

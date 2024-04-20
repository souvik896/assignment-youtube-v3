import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { YoutubeService } from './youtube.service';
import { ImageRendererComponent } from './image-renderer/image-renderer.component';
import { Subscription } from 'rxjs';
import { CutomheaderComponent } from './cutomheader/cutomheader.component'
@Component({
  selector: 'app-ag-grid',
  standalone: true,
  imports: [CommonModule,AgGridAngular, CutomheaderComponent],
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit, OnDestroy {
  columnDefs: any;
  rowData = [];
  api: any;
  gridapi: any
  finalrowdata: any; imageUrl: any;
  subcription: Subscription;
  colDefs: ColDef[] = [
    { field: "imageUrl" },
    { field: "Published on" },
    { field: "Video Title" },
    { field: "Description" }
  ];
  gridOptions: any;
  constructor(private $YoutubeService: YoutubeService) { }

  ngOnInit(): void {
    this.gridOptions = {
      rowSelection: 'multiple',
      columnDefs: [
        {
          headerCheckboxSelection: true,
          width: 50,
          cellRenderer: CutomheaderComponent,
        },
        { field: "imageUrl", flex: 1, filter: true, cellRenderer: ImageRendererComponent }, //This column will be twice as wide as the others
        { field: "Published on", flex: 1, filter: true },
        { field: "Video Title", flex: 3, filter: true },
        { field: "Description", flex: 3, filter: true },

      ],

    };

    this.subcription = this.$YoutubeService.getVideos().subscribe((res) => {

      console.log(res.items)
      if (res && res.items) {
        res.items.forEach(element => {
          this.rowData.push(
            {
              Checkrow: false,
              id: Math.random().toFixed(2),
              "imageUrl": element.snippet.thumbnails.high.url,
              'Published on': element.snippet.publishedAt,
              'Video Title': element.snippet.title,
              'Description': element.snippet.description
            }
          )
        });
        this.finalrowdata = this.rowData;
        console.log(this.finalrowdata, '-----------------')
      }
    }, error => {
      console.log(error)
    })
  }
  onGridReady(params: any) {
    this.gridapi = params.api;
  }


  components = {
    customHeaderComponent: CutomheaderComponent,
    imageRendererComponent: ImageRendererComponent
  };
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}

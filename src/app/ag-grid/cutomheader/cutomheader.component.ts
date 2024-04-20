import { Component ,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgRendererComponent} from 'ag-grid-angular';

@Component({
  selector: 'app-cutomheader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cutomheader.component.html',
  styleUrls: ['./cutomheader.component.css']
})
export class CutomheaderComponent implements AgRendererComponent {
   params: any;
  gridapi: any;
  selectAllChecked: any;
  tempdata=[]
  agInit(params: any): void {
    this.params = params;
    console.log('Row Data:', this.getAllRowData());
  }


  refresh(params: any): boolean {
   
    return false;
  }
  getAllRowData(): any[] {
    const rowData: any[] = [];
    const api = this.params.api;
    if (api) {
      const rowsToDisplay = api.getModel().rowsToDisplay;
      rowsToDisplay.forEach(rowNode => {
        rowData.push(rowNode.data);
      });
    }
    return rowData;
  }

  selectAll(event) {
    
    // this.selectAllChecked = event.target.checked;
    // this.params.api.selectAll(this.selectAllChecked);
    let foundObj=this.getAllRowData().find(item=>item.id===this.params.data.id)
    if(event.target.checked)foundObj.Checkrow=true;
    else foundObj.Checkrow=false;
   
    let checkCount=this.getAllRowData().filter((rowdata=>rowdata.Checkrow)).length
    if(checkCount==this.getAllRowData().length)this.params.api.selectAll(this.selectAllChecked);
    else this.params.api.delectAll(this.selectAllChecked);
   }
}

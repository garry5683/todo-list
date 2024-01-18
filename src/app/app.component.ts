import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from './services/common.service';
import { AddDataComponent } from './components/add-data/add-data.component';
import { MatDialog } from '@angular/material/dialog';

export interface UserData {
  topic: string;
  explanation: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo1';
  displayedColumns: string[] = ['topic', 'explanation'];
  dataSource = new MatTableDataSource([]);

  constructor(
    private commonservice: CommonService,
    public dialog: MatDialog,
) { }

ngOnInit() {
    this.commonservice.topicDtls().subscribe((result: any) => {
      this.dataSource=new MatTableDataSource(result);
      
      // For Filtering from Starting point
      
      this.dataSource.filterPredicate = 
        (data: UserData, filtersJson: string) => {
          const matchFilter: any[] = [];
          const filters = JSON.parse(filtersJson);
          filters.forEach((filter: { id: string; value: string; }) => {
            const val =  data['topic'] === null ? '' :  data['topic'];
            let filterval=val.split("").slice(0,filter.value.length).join("")
            matchFilter.push(filterval.toLowerCase().includes(filter.value.toLowerCase()));
          });
            return matchFilter.every(Boolean);
        };

        // For Filtering from any point
        // 
        // this.dataSource.filterPredicate = 
        // (data: UserData, filtersJson: string) => {
        //   const matchFilter: any[] = [];
        //   const filters = JSON.parse(filtersJson);
    
        //   filters.forEach((filter: { id: string; value: string; }) => {
        //     const val =  data['topic'] === null ? '' :  data['topic'];
        //     matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
        //   });
        //     return matchFilter.every(Boolean);
        // };
    })
  }

  applyFilter(event: Event) {
    const tableFilters = [];
    tableFilters.push({
      id: 'topic',
      value: (event.target as HTMLInputElement).value
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  splitfunc(val:any){
    return val.split("|")
  }

  addTask(){
    const dialogRef = this.dialog.open(AddDataComponent, {
      width:  "75%",
      height: "75%"  
    })

    dialogRef.afterClosed().subscribe(result1 => {
      this.commonservice.topicDtls().subscribe((result: any) => {
        this.dataSource=new MatTableDataSource(result);
      })
    });
  }

}

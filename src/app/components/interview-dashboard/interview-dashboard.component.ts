import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { AddDataComponent } from '../../components/add-data/add-data.component';
import { MatDialog } from '@angular/material/dialog';

export interface UserData {
  topic: string;
  explanation: string;
}

@Component({
  selector: 'app-interview-dashboard',
  templateUrl: './interview-dashboard.component.html',
  styleUrls: ['./interview-dashboard.component.scss']
})
export class InterviewDashboardComponent {
  displayedColumns: string[] = [ 'explanation'];
  dataSource = new MatTableDataSource([]);

  constructor(
    private commonservice: CommonService,
    public dialog: MatDialog,
) { }

ngOnInit() {
    this.commonservice.topicDtlsnew('Angular').subscribe((result: any) => {
      this.dataSource=new MatTableDataSource(result); // load from localhost
      // this.dataSource=new MatTableDataSource(result['topics']);// load from github
      this.filterPredicatefunc()
    })
  }
  heading:string="Angular";
  changeSub(string:string){
    this.heading=string;
    this.commonservice.topicDtlsnew(string).subscribe((result: any) => {
      this.dataSource=new MatTableDataSource(result);
      this.filterPredicatefunc()
    })
  }

  filterPredicatefunc(){
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
    return val.split("\n")
  }
  checkfunc(val:any){
    if(val.includes("\n")){return true}else{return false} 
  }
  programfunc(val:any){
    if(val.includes("Program") || val.includes("***")){return true}else{return false} 
  }

  addTask(){
    const dialogRef = this.dialog.open(AddDataComponent, {
      width:  "75%",
      height: "75%",
      data:this.heading
    })

    dialogRef.afterClosed().subscribe(result1 => {
      this.commonservice.topicDtlsnew(this.heading).subscribe((result: any) => {
        this.dataSource=new MatTableDataSource(result);
        this.filterPredicatefunc()
      })
    });
  }

}

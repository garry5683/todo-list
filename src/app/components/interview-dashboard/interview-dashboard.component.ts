import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { AddDataComponent } from '../../components/add-data/add-data.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  tableData : any=[];
  isMobile: boolean = false;

  constructor(
    private commonservice: CommonService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
) { }

ngOnInit() {
    this.isMobile = window.innerWidth <= 800;

    this.commonservice.topicDtlsnew('Angular').subscribe((result: any) => {
      this.dataSource=new MatTableDataSource(result); // load from localhost
      this.tableData = result.sort((a:any, b:any) => a.topic.localeCompare(b.topic));
      // this.dataSource=new MatTableDataSource(result['topics']);// load from github
      this.filterPredicatefunc()
    })
  }
  heading:string="Angular";
  changeSubSelector(event:any){
    // console.log(event.target.value)
    this.changeSub(event.target.value)
  }

  changeSub(string:string){
    this.heading=string;
    this.commonservice.topicDtlsnew(string).subscribe((result: any) => {
      this.dataSource=new MatTableDataSource(result);
      this.tableData = result.sort((a:any, b:any) => a.topic.localeCompare(b.topic));;
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
applyFilter2Select(event:any){
      this.applyFilter2(event.target.value)
}
  applyFilter2(value:any) {
    const tableFilters = [];
    tableFilters.push({
      id: 'topic',
      value: value
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  splitfunc(val:any){
    if(val==null){return []}
    return val.split("\n")
  }
  checkfunc(val:any){
    if(val==null){return false}
    if(val.includes("\n")){return true}else{return false} 
  }
  nullChecker(val:any,img:any){
    if(val==null || val==""){
      if(img){return true}else{return false}}else{return true} 
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
    getSafe(val: string): SafeHtml {
    const formatted = val.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }

}

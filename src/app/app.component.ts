import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from './services/common.service';
import { AddDataComponent } from './components/add-data/add-data.component';
import { MatDialog } from '@angular/material/dialog';



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
      console.log(result)
      this.dataSource=new MatTableDataSource(result);
    })
  }

  addTask(){
    const dialogRef = this.dialog.open(AddDataComponent, {
      width:  "75%",
      height: "75%"  
    })
    dialogRef.afterClosed().subscribe(result1 => {
      this.commonservice.topicDtls().subscribe((result: any) => {
        console.log(result)
        this.dataSource=new MatTableDataSource(result);
      })
    });
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

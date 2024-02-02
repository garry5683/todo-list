import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { AddDataComponent } from '../../components/add-data/add-data.component';
import { MatDialog } from '@angular/material/dialog';
import { AddpriceComponent } from '../addprice/addprice.component';

export interface UserData {
  Item: string;
  Price: string;
}

@Component({
  selector: 'app-price-dashboard',
  templateUrl: './price-dashboard.component.html',
  styleUrls: ['./price-dashboard.component.scss']
})
export class PriceDashboardComponent {
  displayedColumns: string[] = ['Item', 'Price'];
  dataSource = new MatTableDataSource([]);

  constructor(
    private commonservice: CommonService,
    public dialog: MatDialog,
) { }

ngOnInit() {
    this.commonservice.priceDtls().subscribe((result: any) => {
      this.dataSource=new MatTableDataSource(result);
      this.filterPredicatefunc()
    })
  }


  filterPredicatefunc(){
      //  // For Filtering from Starting point
      // this.dataSource.filterPredicate = 
      //   (data: UserData, filtersJson: string) => {
      //     const matchFilter: any[] = [];
      //     const filters = JSON.parse(filtersJson);
      //     filters.forEach((filter: { id: string; value: string; }) => {
      //       const val =  data['Item'] === null ? '' :  data['Item'];
      //       let filterval=val.split("").slice(0,filter.value.length).join("")
      //       matchFilter.push(filterval.toLowerCase().includes(filter.value.toLowerCase()));
      //     });
      //       return matchFilter.every(Boolean);
      //   };

        // For Filtering from any point
        this.dataSource.filterPredicate = 
        (data: UserData, filtersJson: string) => {
          const matchFilter: any[] = [];
          const filters = JSON.parse(filtersJson);
    
          filters.forEach((filter: { id: string; value: string; }) => {
            const val =  data['Item'] === null ? '' :  data['Item'];
            matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
          });
            return matchFilter.every(Boolean);
        };

  }
  applyFilter(event: Event) {
    const tableFilters = [];
    tableFilters.push({
      id: 'Item',
      value: (event.target as HTMLInputElement).value
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  // splitfunc(val:any){
  //   return val.split("\n")
  // }

  addTask(){
    const dialogRef = this.dialog.open(AddpriceComponent, {
      width:  "75%",
      height: "75%"  
    })

    dialogRef.afterClosed().subscribe(result1 => {
      this.commonservice.priceDtls().subscribe((result: any) => {
        this.dataSource=new MatTableDataSource(result);
        this.filterPredicatefunc()
      })
    });
  }

}


import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { AddDataComponent } from '../../components/add-data/add-data.component';
import { MatDialog } from '@angular/material/dialog';
import { AddpriceComponent } from '../addprice/addprice.component';
import * as CryptoJS from 'crypto-js';

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
//   let outval:any=[] 
// this.itemss.forEach((element:any) => {
//   let val=element.item.split("|")
//   if(!outval.some((me:any)=>me.itemName==(val[0]))){
//     console.log(outval.some((me:any)=>me.itemName==(val[0])))
//   outval.push({
//     "itemName":(val[0]),
//     // "purchaserate":this.val1(val[1]),
//     "mrp":this.val1(val[2]),
//     // "estimetedRate":this.val1(val[3]),
//     "rate1":this.val1(val[4]),
//     // "rate2":this.val1(val[5])
//   })}
// });
// this.val=JSON.stringify(outval)

    this.commonservice.priceDtls().subscribe((result: any) => {
      this.dataSource=new MatTableDataSource(result);
      // this.dataSource=new MatTableDataSource(result['prices']);
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


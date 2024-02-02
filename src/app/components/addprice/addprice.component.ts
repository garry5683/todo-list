import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-addprice',
  templateUrl: './addprice.component.html',
  styleUrls: ['./addprice.component.scss']
})
export class AddpriceComponent {

  constructor(
    private formBuilder: FormBuilder,
    private commonService:CommonService,
    private dialogRef: DialogRef<any>
) { }

  form = this.formBuilder.group({
    Item: ['', Validators.required],
    Price: ['', Validators.required]
});

  confirm(){
    let arr={"Item": this.form.controls.Item.value, "Price":this.form.controls.Price.value}
    this.commonService.PriceDtlspost(arr).subscribe({
      next:(val:any)=>{
        this.dialogRef.close();
      },
      error:(err)=>{
        console.log(err);
      },
  });
}
}
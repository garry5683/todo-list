import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent {
 
  constructor(
    private formBuilder: FormBuilder,
    private commonService:CommonService,
    private dialogRef: DialogRef<any>
) { }

  form = this.formBuilder.group({
    topic: ['', Validators.required],
    description: ['', Validators.required]
});

  confirm(){
    if(!!this.arr){
    this.commonService.topicDtlspost(this.arr).subscribe({
      next:(val:any)=>{
        // alert('Topic Added Successfully');
        this.dialogRef.close();
      },
      error:(err)=>{
        console.log(err);
      },
  });
  }else{
    alert('Please add Task Before Confirming');``
  }
}

  arr:any;
  addfunc(){
    if(!!this.arr){
      this.arr.explanation.push({"subtopic":this.form.controls.topic.value,"explanation":this.form.controls.description.value})
    }else{
      this.arr={"topic": this.form.controls.topic.value, "explanation":[{"subtopic":this.form.controls.topic.value,"explanation":this.form.controls.description.value}]}
    }
    this.form.reset()
  }
}

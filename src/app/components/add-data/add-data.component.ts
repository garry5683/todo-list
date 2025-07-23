import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private dialogRef: DialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { dialogRef.disableClose = true; 
    this.heading=data;}

  form = this.formBuilder.group({
    topic: ['', Validators.required],
    description: ['']
});

@ViewChild('imgRenderer')
imgRenderer!: ElementRef;


onPaste(event: any) {
  const items = event.clipboardData.items;
  let blob = null;

  for (const item of items) {
    if (item.type.indexOf('image') === 0) {
      blob = item.getAsFile();
    }
  }

  // load image if there is a pasted image
  if (blob !== null) {

    const fileFromBlob: File = new File([blob], 'your-filename.jpg');

    const reader = new FileReader();
    reader.onload = (evt: any) => {
      console.log(evt.target.result); // data url!
      this.imgRenderer.nativeElement.src = evt.target.result;
    };
    reader.readAsDataURL(blob);
  }
}
heading:string='';

  confirm(){
    if(!!this.arr){
    this.commonService.topicDtlspost(this.arr,this.heading).subscribe({
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
      this.arr.explanation.push({"subtopic":this.form.controls.topic.value,"explanation":this.form.controls.description.value,"image":this.imgRenderer.nativeElement.src.includes("http")?"":this.imgRenderer.nativeElement.src})
    }else{
      this.arr={"topic": this.form.controls.topic.value, "explanation":[{"subtopic":this.form.controls.topic.value,"explanation":this.form.controls.description.value,"image":this.imgRenderer.nativeElement.src.includes("http")?"":this.imgRenderer.nativeElement.src}]}
    }
    this.form.reset()
    this.imgRenderer.nativeElement.src=''
  }
}

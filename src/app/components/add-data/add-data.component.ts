import { Component } from '@angular/core';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent {

  confirm(){
    console.table(this.arr)
  }
  head:any;
  arr:any;
  addfunc(){
    if(!!this.arr){
      let data={"topic": "classes", "explanation":[{"subtopic":"Garry","explanation":"David"},{"subtopic":"Richi","explanation":"mot"}]}
      this.arr.explanation.push({"subtopic":"Garry","explanation":"David"})
    }else{
      this.arr={"topic": "classes", "explanation":[{"subtopic":"classes","explanation":"mot"}]}
    }
  }

}

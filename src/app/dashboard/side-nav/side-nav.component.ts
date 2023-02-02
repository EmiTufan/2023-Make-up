import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiService } from 'src/Service/api.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  constructor(public api :ApiService)  { }
  ProfileImage:any
  word:string = 'aledwentina@gmail.com'
  email:string = ''
  hidden = false;
  fileName:any
   mask(word:any) {
    if (this.word.length <=4) {
      return this.word
    } else {
    var nr =this.word.length - 5

      var masked = this.word.substring(0, this.word.length - nr).replace(/[a-z\d]/gi,"#") + 
      this.word.substring(this.word.length - nr, this.word.length)
      return masked;
    }
  }

  selectImage(event: any) {
    const file = event.target.files[0];
    const  id = '46845'
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("files", file);
      formData.append("id", id);
      this.postimageProfile(formData)
    }
  }
  getImageProfile(){
    this.api._getProfileImage().subscribe((data:any)=>{
      this.ProfileImage = data[0].urlLink
    })
  }

  postimageProfile(formData:any){
    this.api._postProfileImage(formData).subscribe((data)=>{
      console.log(data)
    },(rror)=>console.log(rror))
  }

  ngOnInit(): void {
    this.api.getrefreshneed$().subscribe(()=>{
      this.ProfileImage = ''
    this.getImageProfile()
    })

    this.getImageProfile()
    this.email = this.mask(this.word)
  }
  logout(){
    localStorage.clear()
    window.location.reload();
  }



}

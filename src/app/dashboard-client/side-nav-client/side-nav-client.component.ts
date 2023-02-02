import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Service/api.service';
import { TokenService } from 'src/Service/token.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-side-nav-client',
  templateUrl: './side-nav-client.component.html',
  styleUrls: ['./side-nav-client.component.css']
})
export class SideNavClientComponent implements OnInit {
info:any
firstname:any
lastname:any
profileimg:any
fileName:any
id:any

  constructor(public api: ApiService, public token: TokenService, private router: Router) { }

  ngOnInit(): void {

   this.api.getref().subscribe(()=>{
    this.getProfileImageData()

   })

  this.info = this.getttoken()
  this.firstname = this.info.firstName
  this.lastname = this.info.lastname
  this.id = this.getttoken().profileID
  this.getProfileImageData()
  }
  logOut(){
    localStorage.removeItem('authToken')
    location.reload();
  }
  getttoken() {
    var x = this.token.getInfoToken();
    return x.row;
  }


  getProfileImageData(){
    this.api._getProfileImageClient({ userId: this.id}).subscribe((data:any)=>{
    this.profileimg = data
    })
  }


  selectImage(event: any) {
    const file = event.target.files[0];
    if(file){
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("files", file);
      formData.append("userId", this.id);
      this.api._uploadClientProfileImg(formData).subscribe((data)=>{
        // console.log(data)
      }, (error)=>{
        // console.log(error)
      })
    }
    // console.log(file)
    }

}

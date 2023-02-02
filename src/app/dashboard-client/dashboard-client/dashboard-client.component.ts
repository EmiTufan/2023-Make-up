import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ThisReceiver } from '@angular/compiler';
import { TokenService } from 'src/Service/token.service';
@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {

  constructor( private TokenService: TokenService) { 
  }

  ngOnInit(): void {
  if (this.TokenService.verifyToken() == true) {
    this.TokenService.deleteToken()
  }


    let win = (window as any);
      if(win.location.search == 'client' ) {
         console.log('loaded')
      }
  }
  ngAfterViewInit(){
    // location.reload()

 }
  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

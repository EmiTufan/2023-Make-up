import { Component } from '@angular/core';
import { ApiService } from 'src/Service/api.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'make-up';
  routerx:any = ''
  constructor(private router: Router, private api:ApiService){

  this.routerx = this.router
  }
  
  ngOnInit(): void {
   
  }
}

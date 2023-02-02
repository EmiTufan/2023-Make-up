import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  iconNav:boolean= true

  constructor(private router: Router,private breakpointObserver: BreakpointObserver,) { // detect screen size changes
   
    this.breakpointObserver.observe(["(max-width: 570px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.toggleSidebarForMe.emit();

      } else {
        this.toggleSidebarForMe.emit();
      }
    });}

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
    this.iconNav = !this.iconNav
  }
}

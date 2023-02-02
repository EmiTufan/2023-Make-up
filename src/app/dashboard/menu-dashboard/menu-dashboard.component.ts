import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import VanillaTilt from "vanilla-tilt";
import { DOCUMENT } from "@angular/common";
import { ApiService } from "src/Service/api.service";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: "app-menu-dashboard",
  templateUrl: "./menu-dashboard.component.html",
  styleUrls: ["./menu-dashboard.component.css"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MenuDashboardComponent implements OnInit {

  @ViewChild("mydiv", { static: true }) public mydiv: ElementRef | any;
  @ViewChild("mydiv2", { static: true }) public mydiv2: ElementRef | any;
  @ViewChild("mydiv3", { static: true }) public mydiv3: ElementRef | any;

  ELEMENT_DATA: any = [];

  dataSource: any
  columnsToDisplay = ['id', 'name', 'price', 'ora', 'data', 'email', 'acction'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null | undefined;

  timeLeft: number = 0;
  timeLeft2: number = 0;
  timeLeft3: number =0;
  interval: any = 1;
  interval2: any = 1;
  interval3: any = 1;
  counter: any = 0;
  counter2: any = 0;
  counter3: any = 0;
  nodata: boolean | undefined;
  empList: Array<any> = [];
  x: any[] = []
 acction:any = 'true'
 today:any
 checkDate:any
  imageUrl:any [] = []
  constructor(@Inject(DOCUMENT) document: Document, private api: ApiService) {
    this.api.getAllData().subscribe((data) => {
      this.timeLeft = data.length
    })
  }
  ngOnInit(): void {
    this.getsum()
    this.getData()
    this.getCalendarDate()
    this.interval = setInterval(() => {
      this.counter += 1;
      if (this.counter >= this.timeLeft) {
        clearInterval(this.interval);
      }
    }, 200);
    VanillaTilt.init(this.mydiv.nativeElement);
    VanillaTilt.init(this.mydiv2.nativeElement);
    VanillaTilt.init(this.mydiv3.nativeElement);
  }
  getData() {
    this.api._getCalendarData().subscribe((data: any) => {
      // console.log(data)
    });
  }

  getCalendarDate() {
    this.api._getCalendarClient().subscribe((data: any) => {
      this.timeLeft2 = data.length
      this.interval2 = setInterval(() => {
        this.counter2 += 1;
        if (this.counter2 >= this.timeLeft2) {
          clearInterval(this.interval2);
        }
      }, 10);
      
      data.forEach((element: any, index:any) => {
        this.checkdate(element.data)
        this.x.push(element.pret)
        let data = parseInt(element.idpost)
        const info = {
          id: index+1,
          name: element.name,
          price: element.pret,
          data: new Date(element.data).toISOString().slice(0, 10),
          ora: element.ora,
          img: this.imageUrl[0],
          email: element.email,
          description: element.descriere,
          tip_makeup: element.tipmachiaj,
          phone_nr: element.phonenr,
          oraEnd: element.oraEnd,
          idPost: element.idpost,
          acction: this.acction
          
        }
        this.ELEMENT_DATA.push(info)
        this.dataSource = this.ELEMENT_DATA;
      });
    }, (error) => {
      console.log(error)
    })
  }
  getsum(){
    this.api._getTotalPrice().subscribe((data:any)=>{
      data.map((x:any) => this.timeLeft3 = x.Total)
      this.interval3 = setInterval(() => {
        this.counter3 += 1;
        if (this.counter3 >= this.timeLeft3) {
          clearInterval(this.interval3);
        }
      }, 10);
    })
  }

  keyFunc(event:any){
    this.api._getByName(event.target.value).subscribe((data:any)=>{
      this.ELEMENT_DATA = []
      this.dataSource = this.ELEMENT_DATA;
      data.forEach((element: any) => {
        this.checkdate(element.data)
        this.x.push(element.pret)
        const info = {
          id: 1,
          name: element.name,
          price: element.pret,
          data: new Date(element.data).toISOString().slice(0, 10),
          ora: element.ora,
          img: 'http://localhost:3501/images/default_profile/avatar-person.svg',
          email: element.email,
          description: element.descriere,
          tip_makeup: element.tipmachiaj,
          phone_nr: element.phonenr,
          oraEnd: element.oraEnd,
          idPost: element.idpost,
          acction: this.acction

        }
        this.ELEMENT_DATA.push(info)
        this.dataSource = this.ELEMENT_DATA;
      });
    })
  }
checkdate(element:any){
  this.today = new Date()
  this.checkDate = new Date(element)
 
  if (this.today > this.checkDate) {
    this.acction = 'Old'
  }else{
    let x = this.checkDate - this.today 
    const seconds = Math.floor(x  / (1000 * 60 * 60 * 24));
    this.acction = `${seconds} Day `
    if (seconds == 0) {
    this.acction = 'Today'
    }
  }
 
}

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
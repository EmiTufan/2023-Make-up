import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Service/api.service';
import { TokenService } from 'src/Service/token.service';
@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css']
})
export class HistoryOrderComponent implements OnInit {
  ELEMENT_DATA: any = [

  ];
  today:any
 checkDate:any
 acction:any = 'true'
  dataSource: any
  columnsToDisplay = ['ID#', 'Email','Tip Machiaj' ,'Data','Status'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null | undefined;

  paramsId:any
  constructor(private api: ApiService, public token:TokenService) { }

  ngOnInit(): void {
  this.paramsId = this.token.getInfoToken().row.profileID
  this.api._getDataCalendarHistory(this.paramsId).subscribe((data:any)=>{
    console.log(data)
    data.forEach((element:any) => {
      this.checkdate(element.data)
      const info:any = {'ID#': element.idpost,Email: element.email,'Tip Machiaj': element.tipmachiaj,Time: element.ora, Data:`${new Date(element.data).getDay()}/${new Date(element.data).getMonth()}/${new Date(element.data).getFullYear()}` ,Status: this.acction,}
      this.ELEMENT_DATA.push(info)
      this.dataSource = this.ELEMENT_DATA;
    });

  }, (error)=>{
    console.log(error)
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
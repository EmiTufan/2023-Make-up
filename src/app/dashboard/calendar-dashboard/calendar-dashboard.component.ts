import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Calendar, CalendarOptions } from '@fullcalendar/angular';
import { ApiService } from 'src/Service/api.service';
import { TokenService } from 'src/Service/token.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-calendar-dashboard",
  templateUrl: "./calendar-dashboard.component.html",
  styleUrls: ["./calendar-dashboard.component.css"],
})
export class CalendarDashboardComponent implements OnInit {
  deLaData: any = "";
  panaLaData: any = "";
  descriere: any = "";
  ora: any = "";
  formTextarea: any;
  postId: any = "";
  title: any = "";
  exampleArray: any;
  x: any;
  formTitle: any
  starts: any;
  ends: any;
  formGroup: any;
  empList: Array<any> = [];
  messageError: boolean = false
  messageSucces: boolean = false
  modalcalendar: boolean = false
  modaltext:boolean = false
  eventtitle:string = ''
  nodata:boolean = false
idevent:any = ''


  calendarOptions: CalendarOptions | undefined;

  startDate: any;
  endDate: any;

  constructor(
    private api: ApiService,
    private token: TokenService,
    private router: Router
  ) { }

  openDialog() { }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  handleDateClick(arg: { dateStr: string }) {
    console.log(this.empList);
  }


  /////////////  Obtinem inf din datapiker //////
  getStartData(event: any) {
    const data = event;
    var xdatax = `${data.getFullYear()}-${data.getMonth() + 1
      }-${data.getDate()}`;
    this.startDate = xdatax;
  }
  getEndData(event: any) {
    const data = event;
    var xdata = `${data.getFullYear()}-${data.getMonth() + 1
      }-${data.getDate()}`;
    this.endDate = xdata;
    console.log(xdata)

  }
  /////////////  End  //////

  showMessageSuccess() {
    this.modalcalendar = !this.modalcalendar
    var that = this;
    setTimeout(function () {
      that.modalcalendar = !that.modalcalendar
      calendarOptions: that.calendarOptions = {
        initialView: "dayGridMonth",
        dateClick: that.handleDateClick.bind(that), // bind is important!
        eventClick: function (info) {
          that.idevent = info.event.id
          that.eventtitle = info.event.title
          that.modaltext = true
          // that.deletedataCalendar(info.event.id)
          // that.reloadComponent()
        },
        events: that.empList,

      };
    }, 3000);
  }

  loaddata() {


  }
  getData() {
    this.api._getCalendarData().subscribe((data: any) => {
      if (data.length == 0) {
        var that = this;
        setTimeout(function () {
        
          that.nodata = !that.nodata
        }, 3000);
        setTimeout(function () {
          that.nodata = !that.nodata
        }, 5000);
      }
      data.forEach((element: any) => {
        var _start = element.deLa;
        var _end = element.panaLa;
        this.empList.push({ id: element.id, title: element.title, start: _start, end: _end },
        );
      });
    });

    this.getCalendarDate()


    
  }
  getCalendarDate() {
    this.api._getCalendarClient().subscribe((data: any) => {
      data.forEach((element: any) => {
        var title = element.name
        var id = element.id
        var ora = element.ora
        // 2022-11-18T22:00:00.000Z
        // 2022-11-18
        var x = new Date(element.data)
        var day = x.setDate(x.getDate() + 1)
        var y = new Date(day)
        var start = new Date(y).toISOString().slice(0, 10)
        this.empList.push({
          id: element.id,
          title: 'Ocupat',
          start: `${start}T${ora}`,
          end: `${start}T${ora}`,
        });
      });



    }, (error) => {
      console.log(error)
    })
  }
  senddata(): any {
    // var time = this.getttoken()
    var data = {
      title: this.formTitle,
      descriere: this.formTextarea,
      from: this.startDate,
      to: this.endDate,
      idpost: 1,
      time: '18:02:00'
    }
    this.api._postCalendarData(data).subscribe((res) => {
        if(res){
          console.log('dadada')
          var that = this;
          this.messageSucces = !this.messageSucces
          setTimeout(function () {
          that.messageSucces = !that.messageSucces
          that.showMessageSuccess();
          that.reloadComponent()
          }, 1000);
         
        }
       
    }, (err) => {
      console.log(err)
      var that = this;
      this.messageError = !this.messageError
      setTimeout(function () {
      that.messageError = !that.messageError
      }, 1000);
    })
  }
 
 
  closeModal(){
    this.modaltext = !this.modaltext
  }
 
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  getttoken() {
    var x = this.token.getInfoToken()
    return x
  }
  deletedataCalendar(id: any): any {
    this.api._deleteCalendar(id).subscribe(data => console.log(data))
    this.reloadComponent()
  }

  ngOnInit(): void {
    this.showMessageSuccess();
    this.getData()
    this.getttoken()

  }
}

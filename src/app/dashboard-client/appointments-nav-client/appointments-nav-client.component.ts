import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Calendar, CalendarOptions } from "@fullcalendar/angular";
import { ApiService } from "src/Service/api.service";
import { TokenService } from "src/Service/token.service";
import { Router } from "@angular/router";
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: "app-appointments-nav-client",
  templateUrl: "./appointments-nav-client.component.html",
  styleUrls: ["./appointments-nav-client.component.css"],
  
})
export class AppointmentsNavClientComponent implements OnInit {


  [x: string]: any;
  error: any
  deLaData: any = "";
  panaLaData: any = "";
  descriere: any = "";
  ora: any = "";
  formTextarea: any;
  postId: any = "";
  title: any = "";
  exampleArray: any;
  x: any;
  formTitle: any;
  starts: any;
  ends: any;
  formGroup: any;
  empList: Array<any> = [];
  messageError: boolean = false;
  messageSucces: boolean = false;
  modalcalendar: boolean = false;
  modaltext: boolean = false;
  eventtitle: string = "";
  nodata: boolean = false;
  idevent: any = "";
  calendarOptions: CalendarOptions | undefined;
  startDate: any;
  endDate: any;
  FullName: any;
  EmailAdress: any;
  PhoneNumber: any;
  oratime: any;
  xa: any
  price: any;
  optionpachet: any
  nameSuccesError: any
  nameErrorDanger: any

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

  handleDateClick(arg: { dateStr: string }) {  }


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    if (view === 'month') {
      const date = cellDate.getDate();

      return date === 20 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';

  };
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
  }

  /////////////  End  //////

  showMessageSuccess() {
    this.modalcalendar = !this.modalcalendar;
    var that = this;
    setTimeout(function () {
      that.modalcalendar = !that.modalcalendar;
      calendarOptions: that.calendarOptions = {
        initialView: "dayGridMonth",
        dateClick: that.handleDateClick.bind(that), // bind is important!
        displayEventTime: true,
        eventClick: function (info) {
          console.log(info)
        },
        events: that.empList,

      };

    }, 3000);
  }

  getData() {
    this.api._getCalendarData().subscribe((data: any) => {
      if (data.length == 0) {
        var that = this;
        setTimeout(function () {
          that.nodata = !that.nodata;
        }, 3000);
        setTimeout(function () {
          that.nodata = !that.nodata;
        }, 5000);
      }
      data.forEach((element: any) => {
        var _start = element.deLa;
        var _end = element.panaLa;
        var day = new Date(_end);
        var endDay = day.setDate(day.getDate() + 1);
        this.empList.push({
          id: element.id,
          title: element.title,
          start: _start,
          end: endDay,
        });
      });
    });
  }

  senddata(): any {
    if (this.FullName != null && this.EmailAdress != null && this.PhoneNumber != null && this.optionpachet != null && this.formTextarea != null && this.startDate != null && this.price != null && this.oratime != null && this.formTextarea != null) {
      var token = this.getttoken();
      const timeall = this.oratime.split(' - ');
      const timestart = `${timeall[0]}`
      const timeend = `${timeall[1]}`

      var data = {
        idpost: token.id,
        name: this.FullName,
        email: this.EmailAdress,
        phonenr: this.PhoneNumber,
        tipmachiaj: this.optionpachet,
        descriere: this.formTextarea,
        data: this.startDate,
        pret: this.price,
        ora: timestart,
        uid: token.profileID,
        oraEnd: timeend,

      }
      this.api._sendCalendarDataClient(data).subscribe((data: any) => {
        console.log(data)
        var that = this;
        if (data.message == 'Ocupat') {
          if (data.key == 'data') {
            this.messageError = !this.messageError
            that.nameErrorDanger = 'Please verify date'
            setTimeout(function () {
              that.messageError = !that.messageError

            }, 3000);
          } else {
            this.messageError = !this.messageError
            that.nameErrorDanger = 'Please verify ora'
            setTimeout(function () {
              that.messageError = !that.messageError

            }, 3000);
          }
        } else {
          this.messageSucces = !this.messageSucces
          that.nameSuccesError = 'Succes , your appoinments has been send'
          setTimeout(function () {
            that.messageSucces = !that.messageSucces
            location.reload();
          }, 3000);
        }
      }, (error) => {
        var that = this;
        this.messageError = !this.messageError
        this.nameErrorDanger = 'Please verify ora'
        setTimeout(function () {
          that.messageError = !that.messageError
        }, 3000);
      })
    } else {
      var that = this
      that.messageError = !that.messageError
      this.nameErrorDanger = 'All Data is required'
          setTimeout(function () {
            that.messageError = !that.messageError
          }, 3000);
    }

  }

  closeModal() {
    this.modaltext = !this.modaltext;
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  getttoken() {
    var x = this.token.getInfoToken();
    return x.row;
  }

  ngOnInit(): void {
    this.showMessageSuccess();
    this.getData();
    this.getCalendarDate()
    this.price = ' Price'

  }

  onChange(deviceValue: any) {
    this.price = ''
    this.optionpachet = deviceValue.target.value
    if (this.optionpachet == 'Time To Shine') {
      this.price = '150'
    } else if (this.optionpachet == 'Royal Wedding') {
      this.price = '200'
    } else if (this.optionpachet == 'Perfect Moments') {
      this.price = '250'
    } else if (this.optionpachet == 'Tip') {
      this.price = 'Price'
    }
  }
  onChangex(value: any) {

    this.oratime = value.target.value


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
        console.log(start)

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



  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

}

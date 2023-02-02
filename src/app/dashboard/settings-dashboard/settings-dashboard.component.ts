import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { ApiService } from "src/Service/api.service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Component({
  selector: "app-settings-dashboard",
  templateUrl: "./settings-dashboard.component.html",
  styleUrls: ["./settings-dashboard.component.css"],
})
export class SettingsDashboardComponent implements OnInit {
  fileName = "";
  multiplefile = new Array<string>();
  barwidth: string = "0%";
  urls = new Array<string>();
  multipleF = new Array<string>();
  errormsj: boolean = false;
  succesmsj: boolean = false;
  imageprew = false;
  allimg: any[] = [];
  p: number = 1;
  totalImg: any;
  constructor(
    private http: HttpClient,
    public _api: ApiService,
    public router: Router
  ) {}

 

  selectmultipleimg(event: any) {
    const file = event.target.files;
    this.multiplefile = file;
    if (file) {
      for (let f of file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageprew = true;
          this.urls.push(e.target.result);
          this.urls.concat(f);
        };
        reader.readAsDataURL(f);
      }
    }
  }

  onmultiple(): void {
    const FormsData = new FormData();
    var x = "dwdwdwdw";
    FormsData.append("text", x);

    for (let img of this.multiplefile) {
      FormsData.append("files", img);
    }
    this._api
      ._multiImage(FormsData)
      .pipe(
        map((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.barwidth =
              Math.round((100 / (event.total || 0)) * event.loaded) + "%";
          } else if (event.type == HttpEventType.Response) {
            this.allimg = [];
            this.urls = [];
            this.succesmsj = true;
            var that = this;
            setTimeout(function () {
              that.succesmsj = false;
              that.imageprew = !that.imageprew;
            }, 3000);
            this.barwidth = "0%";
          }
        })
      )
      .subscribe(
        (data) => {
          this.allimg = [];
          this.urls = [];
          this.succesmsj = true;
          var that = this;
          setTimeout(function () {
            that.succesmsj = false;
            that.imageprew = !that.imageprew;
          }, 3000);
        },
        (error) => console.log(error)
      );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  removeUpload(id: any) {
    this._api._deleteImgById(id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  allimage(): any {
    this._api._getImage().subscribe((data: any) => {
      this.totalImg = data.length;
      for (let image of data) {
        this.allimg.push({ img: image.url, id: image.id });
      }
    });
  }

  ngOnInit(): void {

    this._api.getrefreshneed$().subscribe((data: any) => {
      this.allimg = [];
      this.urls = [];
      this.allimage();
    });
    this.allimage();
  }
}

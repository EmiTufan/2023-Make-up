import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/Service/api.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"],
})
export class VerifyEmailComponent implements OnInit {
  public logo: string = "aXF.";
  public href: string = "";
  public urlSplit: any = "";
  public data: any = "";
  public message: any = "Please wait...";
  theme: any = true;
  public error:any = false
  public succes:any = false
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.href = this.router.url;
    this.urlSplit = this.href.split("/");
    this.data = this.urlSplit[3];
    var that = this;

    setTimeout(function () {
      that.api.verifyEmailToken(that.data).subscribe(
        (data) => {
          that.message = data;
          console.log(data)
          if (that.message.error == 404) {
            that.error = true
            that.message = that.message.message
          }else if (that.message.error == 300) {
            that.error = true
            that.message = that.message.message
          }else{
            that.succes = true
            that.message = that.message.message
          }
        },
        (err) => console.log(err)
      );
    }, 3000);
    setTimeout(function () {
       that.router.navigate(["login"]);
    }, 5000);
  }
  
}

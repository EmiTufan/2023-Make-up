import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  INJECTOR,
  Inject,
  Renderer2,
} from "@angular/core";
import { ApiService } from "src/Service/api.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from "src/Service/token.service";
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
[x: string]: any;
  theme: any = true;
  toggle: boolean = false;
  logo: string = "aXF.";
  error: any = "";
  errorInfo: any = "";
  spinner: boolean = false;
  password: string = "";
  confpassword:string = ''
  public href: any = "";
  public urlSplit:any = ''
  public data:any = ''
  msgFirstname:any = ''
  msgLastname:any = ''
  messageSuccess: boolean = false;

  email:any = ''
  constructor(private api: ApiService, private router: Router, private token: TokenService) { }
  showMessageSuccess() {
    var that = this;
    setTimeout(function () {
      that.messageSuccess = false;
    }, 3000);
  }
  ngOnInit(): void {
    var that = this;
    this.href = this.router.url;
    this.urlSplit = this.href.split("/");
    this.data = this.urlSplit[3];
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.data);
    this.msgFirstname = edit(decodedToken.row.firstName)
    this.msgLastname = edit(decodedToken.row.lastname)
    this.email = decodedToken.row.email

    function edit(x:any) {
      var str = x ? x.charAt(0).toUpperCase() + x.substr(1).toLowerCase() : '';
      return str
    }

    if (
      JSON.stringify(localStorage.getItem("theme")) == JSON.stringify("TRUE")
    ) {
      this.theme = true;
    } else {
      this.theme = false;
    }
  }
  resendpassword(){
    var data ={
      email:this.email,
      password:this.password
      
    }
    if (this.password == '' || this.confpassword == '') {
      this.messageSuccess = true;
      this.showMessageSuccess();
      this.error = "Error";
      this.errorInfo = 'Password required';
      var that = this;
    }else if (this.password != this.confpassword) {
      this.messageSuccess = true;
      this.showMessageSuccess();
      this.error = "Error";
      this.errorInfo = 'Password doe`s not match';
      var that = this;
    }else{
    this.api._updatePassword(data).subscribe((data)=>{
              this.messageSuccess = true;
              this.showMessageSuccess();
              this.error = "Succes";
              this.errorInfo = data;
              var that = this;
            setTimeout(function () {
              that.token.deleteToken()
              that.router.navigate(['login'])
              }, 3000);    
        }, (error)=>{
          this.messageSuccess = true;
          this.showMessageSuccess();
          this.error = "Error";
          this.errorInfo = 'Try again later.';
        })
    }
  }

  changedark() {
    if ((this.theme = !this.theme)) {
      localStorage.setItem("theme", "TRUE");
    } else {
      localStorage.setItem("theme", "FALSE");
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from 'src/Service/api.service';
import { MatAlert } from '@lhn/mat-alert';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})

export class LoginAdminComponent implements OnInit {
  emailFormControl = new FormControl('alexandraflorentda@gmail.com', [Validators.required, Validators.email]);
  hide = true;
  matcher = new MyErrorStateMatcher();
  passwrod = new FormControl('AlexandraFlorentina!a', [Validators.required]);
  constructor(private api: ApiService, private toast: NgToastService, public Router: Router) { }
  ngOnInit(): void {
  }
  sendData() {
    const email = this.emailFormControl.value
    const password = this.passwrod.value
    const data = {
      email: email,
      password: password
    }
    this.api._admin_login(data).subscribe((data: any) => {
      if (data.message == 'Password not working') {
        this.showError()
      } else {
        this.showSuccess()
        localStorage.setItem('keyAdmin', data.token)
        setTimeout(() => {
          this.Router.navigate(['dashboard'])
        }, 5000);
      }
    }, (error: any) => {
      console.log(error)
    })
  }
  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Redirect to your account!', duration: 2000 });
  }
  showError() {
    this.toast.error({ detail: "ERROR", summary: 'Password not working', duration: 2000 });
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


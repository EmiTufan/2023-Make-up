import { Component, OnInit } from "@angular/core";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { ErrorStateMatcher } from "@angular/material/core";
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
} from "@angular/forms";
import { ApiService } from "src/Service/api.service";
import { NgToastService } from "ng-angular-popup";

@Component({
    selector: "app-home-dashboard",
    templateUrl: "./home-dashboard.component.html",
    styleUrls: ["./home-dashboard.component.css"],
})
export class HomeDashboardComponent implements OnInit {
    imgChangeEvt: any = "";
    cropImgPreview: any = "";
    firstName: any;
    lastName: any;
    curentValue = "";
    index: any;
    letter: any;
    letters: any[] = [];

    constructor(public api: ApiService, public toast: NgToastService) { }
    ngOnInit(): void {
        this.getTitle();
        this.getLetter();
    }
    getTitle() {
        this.api.$getTitle().subscribe(
            (data: any) => {
                data.forEach((el: any) => {
                    this.curentValue = `${el.fname} ${el.lname}`;
                    this.index = el.id;
                });
            },
            (error: any) => {
                console.log(error);
            }
        );
    }
    updateTitle() {
        const firstName = this.firstName;
        const lastName = this.lastName;
        const datas = { lname: lastName, fname: firstName, id: this.index };
        this.api.$updateTitle(datas).subscribe(
            (data: any) => {
                if (data.message == "ok") {
                    this.getTitle();
                    this.showSuccess("Title hass been edited!");
                } else {
                    this.showError("Please try again later!");
                }
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    getLetter() {
        this.api.$getletter().subscribe((data: any) => {
            data.forEach((el: any) => {
                const data = { id: el.id, viewValue: el.letter };
                this.letters.push(data);
            });
        });
    }
    addLetter() {
        const data = {
            letter: this.letter,
        };
        this.api.$addLetter(data).subscribe((data: any) => {
            if (data.message == "ok") {
                this.letters = [];
                this.getLetter();
                this.showSuccess("Word successfully added");
            } else {
                this.showError("Please try again later!");
            }
        });
    }
    deleteletter(data: any) {
        this.api.$deleteLetter(data).subscribe((data: any) => {
            if (data.message == "ok") {
                this.letters = [];
                this.getLetter();
                this.showSuccess("Word successfully added");
            } else {
                this.showError("Please try again later!");
            }
        });
    }

    showSuccess(msg: any) {
        this.toast.success({ detail: "SUCCESS", summary: msg, duration: 2000 });
    }
    showError(msg: any) {
        this.toast.error({ detail: "ERROR", summary: msg, duration: 2000 });
    }
}

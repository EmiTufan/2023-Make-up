import { Component, HostListener, OnInit, Inject, VERSION, ViewChildren } from "@angular/core";
import {
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { Router } from "@angular/router";
import { OwlOptions } from 'ngx-owl-carousel-o';
import VanillaTilt from 'vanilla-tilt'
import { DOCUMENT } from '@angular/common';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { ApiService } from "src/Service/api.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})

export class HomeComponent implements OnInit {
  photo: boolean = false
  map: boolean = false
  title = 'angularTests';
  list = ['Make-up Artist', 'Mother', 'Student']
  toggle: boolean = false;
  theme: boolean = false
  scrollTop = 0;
  headerNavBar: boolean = false
  name = "Angular " + VERSION.major;
  settings = {
    counter: false,
    plugins: [lgZoom]
  };
  _one: any = true
  _tow: any = false
  _three: any = false

  firstName:any
  lastName:any



  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
  constructor(private router: Router, @Inject(DOCUMENT) document: Document, public api: ApiService) { }

  @HostListener('document:scroll')
  scrollFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.headerNavBar = true
    } else {
      this.headerNavBar = false
    }
  }



  clickEvent($event: any) {
    this.toggle = !this.toggle;
  }




  ngOnInit(): void {
   

  this.getTitle()
  this.getLetter()
    if (
      JSON.stringify(localStorage.getItem("theme")) == JSON.stringify("TRUE")
    ) {
      this.theme = true;
    } else {
      this.theme = false;
    }
  }


  getTitle(){
    this.api.$getTitle().subscribe((data:any)=>{
      data.forEach((element:any) => {
          this.firstName = element.fname
          this.lastName = element.lname
      });
    })
  }

  getLetter(){
    this.api.$getletter().subscribe((data:any)=>{
      data.forEach((element:any) => {
        this.list.push(element.letter)
      });
    })
  }





  
  changedark() {
    if ((this.theme = !this.theme)) {
      localStorage.setItem("theme", "TRUE");
    } else {
      localStorage.setItem("theme", "FALSE");
    }
  }
  onScroll($event: any) {
    this.scrollTop < $event.target.scrollTop;
    this.scrollTop = $event.target.scrollTop;
    console.log(this.scrollTop)
  }

  photoShow(): void {
    this.photo = !this.photo
  }

  showmap(): void {
    this.map = !this.map
  }


  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  one(): void {
    this._one = true
    this._three = false
    this._tow = false

  }
  tow(): void {
    this._tow = true
    this._one = false
    this._three = false
  }
  three(): void {
    this._three = true
    this._one = false
    this._tow = false

  }



  imagesData = [
    { id: 4, title: 'Bridal Makeup', desc: 'Bridal makeup is an essential part of the wedding planning process and designing the perfect look for your wedding day is my number one priority. Here you will find some of the latest beauty trends along with coordinating makeup vision boards to serve as inspiration.', images: '../../assets/crown-front-premium.png' },
    { id: 1, title: 'Day Makeup', desc: 'Day makeup is the term used to refer to light, natural-looking makeup looks that you can wear during the day. It’s often worn on special occasions or when you want your makeup to look more polished than usual.Day makeup looks are usually characterized by a natural base, with a light application of blush and bronzer for color. Eye makeup tends to be minimal as well, either just mascara or maybe a soft eyeliner.', images: '../../assets/sun-front-premium.png' },

    { id: 2, desc: 'The makeup is all about highlighting and contouring. It’s about making your eyes pop and defining your cheekbones. If you’re going to go out at night, this is the makeup that will make you look amazing. Contouring isn’t just for your nose anymore. With night makeup, you can use it to define any feature on your face: Your forehead, chin, jawline and even ears.', title: 'Glam Makeup', images: '../../assets/8704257_headphone_premium_icon.png' },

    { id: 3, desc: 'Professional makeup is SO important for a successful photo session. Makeup, not only gives the client a beautiful, natural glow, it also brings out confidence that translates in every image.', title: 'Photoshoot Makeup', images: '../../assets/video-camera-front-premium.png' },
  ];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    center: true,
    autoplay: true,
    autoplayTimeout: 3000,
    slideTransition: 'linear',
    nav: false,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1
      },
      600: {
        items: 2
      },
      740: {
        items: 2
      },
      850: {
        items: 2,
      },
      1200: {
        items: 4,
      },
      2200: {
        items: 8,
      }
    },

  }
}

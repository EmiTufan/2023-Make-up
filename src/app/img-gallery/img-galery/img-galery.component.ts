import { Component, OnInit ,VERSION} from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import { LightGallery } from 'lightgallery/lightgallery';
import { ApiService } from 'src/Service/api.service';
import { elementAt } from 'rxjs';
@Component({
  selector: "app-img-galery",
  templateUrl: "./img-galery.component.html",
  styleUrls: ["./img-galery.component.css"],
})
export class ImgGaleryComponent implements OnInit {
  private lightGallery!: LightGallery;

  onInit = (detail: any): void => {
    this.lightGallery = detail.instance;
  };
  private needRefresh = false;

  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }

  constructor(private api: ApiService) {}
  p: number = 1;
  items: any[] = [];
  settings = {
    counter: true,
    plugins: [lgZoom],
  };

  ngOnInit(): void {
    this.api._getImage().subscribe((data: any) => {
      data.forEach((elm: any) => {
        this.items = [
          ...this.items,
          {
            src: elm.url,
            thumb: elm.url,
          },
        ];
        this.needRefresh = true;
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, interval, of } from 'rxjs'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { switchMap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'bollywood-trending';

index: number = 0;
  numImages: number = 4;
  imagesLoaded: number = 0;
  loading: boolean = true;
  imagesUrl = [
    "https://picsum.photos/id/407/2500/1667",
    "https://picsum.photos/id/301/2500/1667",
    "https://picsum.photos/id/302/2500/1667", "https://picsum.photos/id/400/2500/1667"]

  ngOnInit() {
    this.imagesUrl.forEach((x, index) => {
      const image = new Image();
      image.onload = (() => {
        this.imagesLoaded++;
        this.loading = (this.imagesLoaded != this.numImages)
      })
      image.src = x
    })
    interval(5000).subscribe(() => {
      if (!this.loading)
        this.index = (this.index + 1) % this.numImages
    })
  }

}

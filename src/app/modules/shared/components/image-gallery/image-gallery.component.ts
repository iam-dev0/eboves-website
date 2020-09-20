import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit, OnChanges {
  @Input() images: string[] = [];
  selectedImage: string = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const change in changes) {
      if (changes.hasOwnProperty(change)) {
        switch (change) {
          case 'images':
            this.selectedImage = changes[change].currentValue[0];
            break;

          default:
            break;
        }
      }
    }
  }

  updateSelectedImage(newImage: string) {
    this.selectedImage = newImage;
  }
}

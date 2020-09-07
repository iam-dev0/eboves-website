import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {
  @Input() images: string[] = [];
  selectedImage: string = '';

  constructor() {}

  ngOnInit(): void {
    this.selectedImage = this.images[0];
  }

  updateSelectedImage(newImage: string) {
    this.selectedImage = newImage;
  }
}

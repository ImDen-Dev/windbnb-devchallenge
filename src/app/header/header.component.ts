import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.media.component.scss'],
})
export class HeaderComponent implements OnInit {
  open = false;
  constructor() {}

  ngOnInit(): void {}

  openModal(): void {
    this.open = true;
  }
  public close(event: any): void {
    if (
      event.target.classList.contains('search__overlay') ||
      event.target.classList.contains('close__btn') ||
      event.target.classList.contains('close__icon')
    ) {
      this.open = false;
    }
  }
}

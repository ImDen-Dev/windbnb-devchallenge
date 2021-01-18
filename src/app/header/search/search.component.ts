import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { ApartmentsService } from 'src/app/shared/apartments.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
    '../header-btn.component.scss',
    './search.component.scss',
    './search.media.component.scss',
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  inFocusLocations = false;
  inFocusGuests = false;
  value = '';
  adult = 0;
  child = 0;
  @ViewChild('inputLocation') loc!: ElementRef;
  @ViewChild('inputGuests') guests!: ElementRef;
  @Output() closeWindow: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public ap: ApartmentsService) {}

  ngOnInit(): void {}

  onFocus(type: string): any {
    this.inFocusLocations = type === 'locations';
    this.inFocusGuests = !this.inFocusLocations;
  }

  searchLocation(inputVal: string): any {
    this.value = inputVal;
  }

  onLocationClick(l: { city: string; country: string }): any {
    this.loc.nativeElement.value = `${l.city}, ${l.country}`;
  }

  guestsCounter(age: string, c: string): any {
    if (age === 'adult') {
      if (c === '-') {
        this.adult > 0 ? this.adult-- : false;
      } else {
        this.adult++;
      }
    }
    if (age === 'child') {
      if (c === '-') {
        this.child > 0 ? this.child-- : false;
      } else {
        this.child++;
      }
    }
  }

  onSubmit(): any {
    const country = this.loc.nativeElement.value;
    const guestsCount = this.guests.nativeElement.value;
    this.ap.filterApartments(country, guestsCount);
    this.closeWindow.emit();
  }

  ngOnDestroy(): void {}
}

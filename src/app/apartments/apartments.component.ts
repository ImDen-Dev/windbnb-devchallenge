import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apartment } from '../shared/apartment';
import { ApartmentsService } from '../shared/apartments.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: [
    './apartments.component.scss',
    './apartments.media.component.scss',
  ],
})
export class ApartmentsComponent implements OnInit, OnDestroy {
  constructor(private ap: ApartmentsService) {}
  apartments: Apartment[] = [];
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.ap.newStays.subscribe(
      (apartments: Apartment[]) => {
        this.apartments = apartments;
      }
    );
    this.apartments = this.ap.getStays();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

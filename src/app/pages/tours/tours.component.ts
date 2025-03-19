import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card"
import { TourService } from '../../core/tour/tour.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatCardModule, MatButtonModule],
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {

  constructor(readonly tourService: TourService) { }

  ngOnInit() {
    // TODO: Fetch Tours implementation
  }

}

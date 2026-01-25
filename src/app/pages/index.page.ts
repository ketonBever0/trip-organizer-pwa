import { Component, OnInit, signal } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'home-page',
  standalone: true,
  template: `
    <p></p>
  `,
  imports: [IonIcon],
})
export default class HomePage implements OnInit {
  constructor() {}

  async ngOnInit() {}
}

import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'home-page',
  standalone: true,
  template: `
    <div class="flex">
      <p>main</p>
    </div>
  `,
  imports: [],
})
export default class HomePage implements OnInit {
  constructor() {}

  async ngOnInit() {}
}

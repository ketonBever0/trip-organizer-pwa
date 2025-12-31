import { Component, OnInit, signal } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'home-page',
  standalone: true,
  template: ` <p>{{ str() }}</p> `,
})
export default class HomePage implements OnInit {
  constructor() {}

  str = signal('');

  async ngOnInit() {
    this.str.set(
      await axios
        .get('http://localhost:5173/api/v1/hello')
        .then((res) => res.data.message)
        .catch(() => 'error')
    );
  }
}

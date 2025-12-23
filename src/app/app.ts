import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen">
      <nav class="sticky p-5">
        NAVBAR
      </nav>
      <main class="flex justify-center">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {}

import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-component',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    
`,
})
export class HeaderComponent implements OnInit {
  // private readonly service = inject(Service);

  constructor() { }

  ngOnInit(): void {
    // Initialization logic here
  }

}
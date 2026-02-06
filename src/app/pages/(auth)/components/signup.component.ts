import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowUndo } from 'ionicons/icons';

@Component({
  selector: 'signup-component',
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton],
  template: `
    <div class="flex justify-center p-4">
      <div class="w-full flex justify-between gap-4">
        <ion-button shape="round" fill="outline" (click)="back()"
          ><ion-icon slot="icon-only" name="arrow-undo"
        /></ion-button>
        <h1>Sign Up</h1>
        <div></div>
      </div>
    </div>
  `,
})
export class Signup implements OnInit {
  constructor() {
    addIcons({ arrowUndo });
  }

  @Output() tabChangeEvent = new EventEmitter<string>();

  back() {
    sessionStorage.removeItem('saved');
    sessionStorage.removeItem('email');
    this.tabChangeEvent.emit('email');
  }

  ngOnInit(): void {}
}

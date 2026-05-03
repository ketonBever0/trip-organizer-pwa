import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { Organization } from '@models/organization.model';
import { OrgService } from '@services/org.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'orgs-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AllComponent implements OnInit {
  constructor() {}

  @Input('orgs') orgs!: Organization[];
  @Output() refreshParent = new EventEmitter<void>();

  async refresh(e: RefresherCustomEvent) {
    this.refreshParent.emit();
    e.target.complete();
  }

  ngOnInit(): void {}
}

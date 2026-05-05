import { Component, inject, OnInit } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { OrgService } from '@services/org.service';
import { AllComponent } from './all/all.component';
import { AuthService } from '@services/auth.service';
import { Organization } from '@models/organization.model';

@Component({
  selector: 'app-organizations-tab',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
  standalone: true,
  imports: [IonicModule, AllComponent],
})
export class OrganizationsTab implements OnInit {
  constructor() {}

  private readonly orgService = inject(OrgService);
  protected readonly authService = inject(AuthService);
  orgs: Organization[] = [];
  ownedOrgs: Organization[] = [];

  ngOnInit() {
    this.authService.userData$.subscribe((user) => {
      if (user) {
        this.getOrgs();
      }
    });
  }

  async refresh(e: RefresherCustomEvent) {
    await this.getOrgs();
  }

  async getOrgs() {
    this.orgs = await this.orgService.getWhereIamMember();
    this.ownedOrgs = this.orgs.filter(
      (org) => org.ownerRef.path == this.authService.getUserRef().path,
    );
  }
}

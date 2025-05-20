import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { OrganizationService } from '@app/core/services/organization/organization.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  imports: [MatCardModule, MatButtonModule, RouterLink, MatTabsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit {
  constructor(
    protected readonly fAuth: AuthService,
    protected readonly os: OrganizationService
  ) {
    effect(async () => {
      if (this.fAuth.userData()?.id) {
        await this.os.getOrganizationsWhereMe();
      }
    });
  }

  async ngOnInit() {
    await this.os.getPublicOrganizations();
  }
}

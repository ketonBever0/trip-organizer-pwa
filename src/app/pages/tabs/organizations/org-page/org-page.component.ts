import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Organization } from '@models/organization.model';
import { OrgService } from '@services/org.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-org-page',
  templateUrl: './org-page.component.html',
  styleUrls: ['./org-page.component.scss'],
  standalone: true,
  imports: [IonicModule, AsyncPipe],
})
export class OrgPageComponent implements OnInit {
  private readonly orgService = inject(OrgService);

  id!: string;
  org$!: Observable<any>;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.pipe(map((params) => params.get('id'))).subscribe({
      next: (id) => {
        if (id) {
          this.org$ = this.orgService.getOrgById(id);
        }
      },
    });
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Organization } from '@models/organization.model';
import { OrgService } from '@services/org.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-org-page',
  templateUrl: './org-page.component.html',
  styleUrls: ['./org-page.component.scss'],
  standalone: true,
  imports: [IonicModule, AsyncPipe],
})
export class OrgPageComponent implements OnInit, OnDestroy {
  private readonly orgService = inject(OrgService);

  id!: string;
  org$!: Observable<any>;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params.get('id')),
      )
      .subscribe({
        next: (id) => {
          if (id) {
            this.org$ = this.orgService.getOrgById(id);
          }
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

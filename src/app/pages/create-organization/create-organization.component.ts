import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { IonBackButton } from '@ionic/angular/standalone';
import { OrgService } from '@services/org.service';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss'],
  standalone: true,
  imports: [IonicModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class CreateOrganizationComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastController: ToastController,
    private readonly router: Router,
  ) {
    this.createOrgForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(24)]],
    });
  }

  private readonly orgService = inject(OrgService);

  createOrgForm: FormGroup;

  orgTypeOptions: { id: number; value: string; text: string }[] = [
    {
      id: 1,
      value: 'Travel Agency',
      text: 'Travel Agency',
    },
    {
      id: 2,
      value: 'School',
      text: 'School',
    },
    {
      id: 3,
      value: 'University',
      text: 'University',
    },
    {
      id: 4,
      value: 'Dormitory',
      text: 'Dormitory',
    },
    {
      id: 5,
      value: 'Person',
      text: 'Person',
    },
  ];

  selectedOrgType: string = '';

  changeSelectedOrgType(e: Event) {
    const target = e.target as HTMLIonSelectElement;
    this.selectedOrgType = target.value;
  }

  async onSubmit() {
    if (this.createOrgForm.valid && this.selectedOrgType != '') {
      try {
        const newOrg = await this.orgService.createOrg(
          this.createOrgForm.value.name,
          this.selectedOrgType,
          this.createOrgForm.value.description,
        );
        const toast = await this.toastController.create({
          message: `${newOrg.name} was successfully created!`,
          duration: 3000,
          position: 'bottom',
        });
        await toast.present();
        this.router.navigateByUrl('/me');
      } catch (e) {
        const toast = await this.toastController.create({
          message: e as string,
          duration: 2000,
          position: 'bottom',
        });
        await toast.present();
      }
    }
  }

  async ngOnInit() {}
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserType } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth/auth.service';
import { StoreService } from '../../../core/services/store/store.service';
import { deleteUser } from '@angular/fire/auth';
import { collection, getDocs, orderBy, query } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [MatTableModule, DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(
    protected readonly fAuth: AuthService,
    protected readonly fStore: StoreService
  ) {}

  displayedColumns: string[] = ['email', 'fullname', 'mobile', 'createdAt', 'lastLogin', 'role'];
  protected users$ = new BehaviorSubject<UserType[]>([]);

  async getUsers() {
    const querySnapshot = await getDocs(
      query(collection(this.fStore.db, 'users'), orderBy('fullname'))
    );
    const users = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as UserType)
    );
    this.users$.next(users);
  }

  deleteUser(id: string) {}

  async ngOnInit() {
    await this.getUsers();
  }
}

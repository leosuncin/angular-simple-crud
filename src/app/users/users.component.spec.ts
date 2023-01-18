import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Mock } from 'moq.ts';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, of } from 'rxjs';

import users from './user.fixture';
import { User } from './user.type';
import UsersComponent from './users.component';
import { UsersService } from './users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        {
          provide: UsersService,
          useFactory() {
            const users$ = new BehaviorSubject<Array<User>>([]);
            const mock = new Mock<UsersService>()
              .setup((service) => service.getAll())
              .callback(() => {
                users$.next(users);

                return of(users);
              })
              .setup((service) => service.users$)
              .returns(users$.asObservable());

            return mock.object();
          },
        },
        {
          provide: BsModalService,
          useFactory() {
            const mock = new Mock<BsModalService>();

            return mock.object();
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all of the users in the table', fakeAsync(() => {
    component.ngOnInit();
    tick();

    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(tableRows.length).toBe(users.length);
  }));
});

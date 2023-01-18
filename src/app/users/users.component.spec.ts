import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mock } from 'moq.ts';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

import users from './user.fixture';
import { UsersComponent } from './users.component';
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
            const mock = new Mock<UsersService>()
              .setup((service) => service.getAll())
              .callback(() => of(users));

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

  it('should show all of the users in the table', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(tableRows.length).toBe(users.length);
  });
});

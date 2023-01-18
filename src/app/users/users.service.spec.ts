import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import userFixtures from './user.fixture';
import { User } from './user.type';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the users', () => {
    expect.assertions(6);
    service.users$.subscribe((users) => {
      // this block is called twice
      expect(Array.isArray(users)).toBe(true);
      expect(users).toStrictEqual(userFixtures);
    });
    service.getAll().subscribe((users) => {
      expect(Array.isArray(users)).toBe(true);
      expect(users).toStrictEqual(userFixtures);
    });

    const request = httpMock.expectOne((request) => request.method === 'GET');

    request.flush(userFixtures);
  });

  it('should create one user', () => {
    expect.assertions(3);
    const data: Partial<User> = {
      name: 'Kerry Hardy',
      username: 'kerry44',
      email: 'kerry_44@hardy.amsterdam',
      address: {
        street: '90 Poplar Avenue',
        suite: 'Apt. 4',
        city: 'Masthope',
        zipcode: '27151-1572',
        geo: {
          lat: '88.165936',
          lng: '49.756363',
        },
      },
      phone: '6990-49104',
      website: 'https://hardy.gw',
      company: {
        name: 'Premiant',
        catchPhrase: 'Occaecat veniam cillum aute pariatur.',
        bs: 'cupidatat laboris eu',
      },
    };

    service.users$.subscribe((users) => {
      expect(users).toHaveLength(userFixtures.length + 1);
      expect(users.at(-1)).toMatchObject(data);
    });
    service.create(data).subscribe((user) => {
      expect(user).toMatchObject(data);
    });

    const request = httpMock.expectOne((request) => request.method === 'POST');

    request.flush({ ...data, id: 11 }, { status: 201, statusText: 'Created' });
  });

  it('should update one user', () => {
    expect.assertions(3);
    const data: Partial<User> = {
      id: 1,
      name: 'Kimberly Hernandez',
      username: 'kimberly27',
      email: 'kimberly_27@hernandez.mortgage',
      address: {
        street: '29 Schermerhorn Street',
        suite: 'House 0',
        city: 'Clay',
        zipcode: '41047-2657',
        geo: {
          lat: '19.775134',
          lng: '120.224783',
        },
      },
      phone: '77110-2666',
      website: 'https://hernandez.lb',
      company: {
        name: 'Mazuda',
        catchPhrase: 'Id mollit consectetur velit ullamco irure non.',
        bs: 'quis veniam duis',
      },
    };

    service.users$.subscribe((users) => {
      expect(users).toHaveLength(userFixtures.length);
      expect(users.at(0)).toMatchObject(data);
    });
    service.update(1, data).subscribe((user) => {
      expect(user).toMatchObject(data);
    });

    const request = httpMock.expectOne((request) => request.method === 'PATCH');

    request.flush({
      ...userFixtures.find(({ id }) => id === data.id),
      ...data,
    });
  });

  it('should remove one user', () => {
    expect.assertions(3);
    const userId = 1;

    service.users$.subscribe((users) => {
      expect(users).toHaveLength(userFixtures.length - 1);
      expect(users.find(({ id }) => id === userId)).toBeUndefined();
    });
    service.remove(userId).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const request = httpMock.expectOne(
      (request) => request.method === 'DELETE'
    );

    request.flush({});
  });
});

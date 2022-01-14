import { TestBed } from '@angular/core/testing';



describe('AuthenticationUserService', () => {
  let service: AuthenticationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

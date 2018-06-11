import { UserEntryModule } from './user-entry.module';

describe('UserEntryModule', () => {
  let userEntryModule: UserEntryModule;

  beforeEach(() => {
    userEntryModule = new UserEntryModule();
  });

  it('should create an instance', () => {
    expect(userEntryModule).toBeTruthy();
  });
});

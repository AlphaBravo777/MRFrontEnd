import { CoreMeatriteModule } from './core-meatrite.module';

describe('CoreMeatriteModule', () => {
  let coreMeatriteModule: CoreMeatriteModule;

  beforeEach(() => {
    coreMeatriteModule = new CoreMeatriteModule();
  });

  it('should create an instance', () => {
    expect(coreMeatriteModule).toBeTruthy();
  });
});

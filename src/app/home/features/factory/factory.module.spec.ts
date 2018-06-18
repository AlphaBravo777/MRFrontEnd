import { FactoryModule } from './factory.module';

describe('FactoryModule', () => {
  let factoryModule: FactoryModule;

  beforeEach(() => {
    factoryModule = new FactoryModule();
  });

  it('should create an instance', () => {
    expect(factoryModule).toBeTruthy();
  });
});

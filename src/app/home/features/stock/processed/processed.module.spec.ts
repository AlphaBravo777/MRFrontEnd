import { ProcessedModule } from './processed.module';

describe('ProcessedModule', () => {
  let processedModule: ProcessedModule;

  beforeEach(() => {
    processedModule = new ProcessedModule();
  });

  it('should create an instance', () => {
    expect(processedModule).toBeTruthy();
  });
});

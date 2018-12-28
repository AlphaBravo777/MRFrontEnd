import { HighRiskModule } from './high-risk.module';

describe('HighRiskModule', () => {
  let highRiskModule: HighRiskModule;

  beforeEach(() => {
    highRiskModule = new HighRiskModule();
  });

  it('should create an instance', () => {
    expect(highRiskModule).toBeTruthy();
  });
});

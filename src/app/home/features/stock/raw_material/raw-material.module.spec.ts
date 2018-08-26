import { RawMaterialModule } from './raw-material.module';

describe('RawMaterialModule', () => {
  let rawMaterialModule: RawMaterialModule;

  beforeEach(() => {
    rawMaterialModule = new RawMaterialModule();
  });

  it('should create an instance', () => {
    expect(rawMaterialModule).toBeTruthy();
  });
});

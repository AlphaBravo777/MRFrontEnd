import { DynamicFieldDirective } from './dynamic-field.directive';

describe('DynamicFieldDirective', () => {
    it('should create an instance', () => {
        const arg1 = null, arg2 = null;
        const directive = new DynamicFieldDirective(arg1, arg2);
        expect(directive).toBeTruthy();
    });
});

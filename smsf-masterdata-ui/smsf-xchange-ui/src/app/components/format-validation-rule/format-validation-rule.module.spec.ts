import { FormatValidationRuleModule } from './format-validation-rule.module';

describe('FormatValidationRuleModule', () => {
  let formatValidationRuleModule: FormatValidationRuleModule;

  beforeEach(() => {
    formatValidationRuleModule = new FormatValidationRuleModule();
  });

  it('should create an instance', () => {
    expect(formatValidationRuleModule).toBeTruthy();
  });
});

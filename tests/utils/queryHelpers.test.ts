import { appendQuery, appendYearsOfExperienceQuery, appendTechQuery, appendWorkSettingsQuery } from '../../src/utils/queryHelpers';
import { maps } from '../../src/utils/maps';

describe('queryHelpers', () => {
  describe('appendQuery', () => {
    it('should append the correct query for a valid parameter', () => {
      const conditions: string[] = [];
      appendQuery(conditions, 'backend', 'Title', maps.title);
      expect(conditions).toContain('Title IN ("Backend Engineer")');
    });

    it('should not append a query for an invalid parameter', () => {
      const conditions: string[] = [];
      appendQuery(conditions, 'nonexistent', 'Title', maps.title);
      expect(conditions).toHaveLength(0);
    });

    it('should append the correct query for an array of parameters', () => {
      const conditions: string[] = [];
      appendQuery(conditions, ['backend', 'frontend'], 'Title', maps.title);
      expect(conditions).toContain('Title IN ("Backend Engineer", "Frontend Engineer\")');
    });
  });

  describe('appendYearsOfExperienceQuery', () => {
    it('should append the correct query for a valid range', () => {
      const conditions: string[] = [];
      appendYearsOfExperienceQuery(conditions, '2', '5');
      expect(conditions).toContain('Yoe >= 2');
      expect(conditions).toContain('Yoe <= 5');
    });

    it('should not append a query for an invalid range', () => {
      const conditions: string[] = [];
      appendYearsOfExperienceQuery(conditions, 'invalid', '5');
      expect(conditions).not.toContain('Yoe >= invalid');
    });
  });

  describe('appendTechQuery', () => {
    it('should append the correct tech query', () => {
      const conditions: string[] = [];
      appendTechQuery(conditions, 'python', 'ProgrammingLanguages', maps.programmingLanguage);
      expect(conditions).toContain('instr(ProgrammingLanguages, "Python") > 0');
    });
  });

  describe('appendWorkSettingsQuery', () => {
    it('should append the correct work settings query', () => {
      const conditions: string[] = [];
      appendWorkSettingsQuery(conditions, ['Office', 'Remote']);
      expect(conditions).toContain('WorkSetting IN ("Office", "Remote")');
    });
  });
});

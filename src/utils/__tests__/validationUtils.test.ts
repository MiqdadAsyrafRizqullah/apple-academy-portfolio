// Feature: personal-portfolio-website, Property 9: Contact Form Validation
// Validates: Requirements 6.2, 6.3
import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { validateContactForm, isFormValid } from '../validationUtils';
import type { FormState } from '../../types';

// Arbitrary for valid email addresses
const validEmail = fc.emailAddress();

// Arbitrary for invalid email addresses
const invalidEmail = fc.oneof(
  fc.constant(''),
  fc.constant('notanemail'),
  fc.constant('@nodomain'),
  fc.constant('no@'),
  fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('@'))
);

// Arbitrary for valid form data
const validFormData = fc.record({
  name: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
  email: validEmail,
  subject: fc.string({ minLength: 3, maxLength: 200 }).filter(s => s.trim().length >= 3),
  message: fc.string({ minLength: 10, maxLength: 1000 }).filter(s => s.trim().length >= 10),
});

describe('validateContactForm — Property 9: Contact Form Validation', () => {
  it('valid form data produces no errors', () => {
    fc.assert(
      fc.property(validFormData, (data) => {
        const errors = validateContactForm(data);
        return Object.keys(errors).length === 0;
      }),
      { numRuns: 100 }
    );
  });

  it('empty name always produces a name error', () => {
    fc.assert(
      fc.property(validFormData, (data) => {
        const invalidData: FormState = { ...data, name: '' };
        const errors = validateContactForm(invalidData);
        return errors.name !== undefined && errors.name.length > 0;
      }),
      { numRuns: 100 }
    );
  });

  it('name with 1 character always produces a name error', () => {
    fc.assert(
      fc.property(
        validFormData,
        fc.string({ minLength: 1, maxLength: 1 }),
        (data, shortName) => {
          const invalidData: FormState = { ...data, name: shortName };
          const errors = validateContactForm(invalidData);
          return errors.name !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('invalid email always produces an email error', () => {
    fc.assert(
      fc.property(validFormData, invalidEmail, (data, badEmail) => {
        const invalidData: FormState = { ...data, email: badEmail };
        const errors = validateContactForm(invalidData);
        return errors.email !== undefined && errors.email.length > 0;
      }),
      { numRuns: 100 }
    );
  });

  it('empty subject always produces a subject error', () => {
    fc.assert(
      fc.property(validFormData, (data) => {
        const invalidData: FormState = { ...data, subject: '' };
        const errors = validateContactForm(invalidData);
        return errors.subject !== undefined;
      }),
      { numRuns: 100 }
    );
  });

  it('message shorter than 10 chars always produces a message error', () => {
    fc.assert(
      fc.property(
        validFormData,
        fc.string({ minLength: 0, maxLength: 9 }),
        (data, shortMessage) => {
          const invalidData: FormState = { ...data, message: shortMessage };
          const errors = validateContactForm(invalidData);
          return errors.message !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('any invalid field combination produces at least one error', () => {
    const invalidFormData = fc.oneof(
      validFormData.map(d => ({ ...d, name: '' })),
      validFormData.map(d => ({ ...d, email: 'invalid-email' })),
      validFormData.map(d => ({ ...d, subject: '' })),
      validFormData.map(d => ({ ...d, message: 'short' })),
    );

    fc.assert(
      fc.property(invalidFormData, (data) => {
        const errors = validateContactForm(data);
        return Object.keys(errors).length > 0;
      }),
      { numRuns: 100 }
    );
  });

  it('isFormValid returns true only when all fields are valid', () => {
    fc.assert(
      fc.property(validFormData, (data) => {
        return isFormValid(data) === true;
      }),
      { numRuns: 100 }
    );
  });
});

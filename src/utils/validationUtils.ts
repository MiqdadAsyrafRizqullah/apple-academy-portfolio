import type { FormState, FormErrors } from '../types';

// RFC 5322 simplified email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

/**
 * Validates contact form data.
 * Returns an object with error messages for each invalid field.
 * An empty object means all fields are valid.
 */
export function validateContactForm(data: FormState): FormErrors {
  const errors: FormErrors = {};

  // Validate name: required, min 2 characters
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Nama wajib diisi.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Nama minimal 2 karakter.';
  }

  // Validate email: required, valid format
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email wajib diisi.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Format email tidak valid.';
  }

  // Validate subject: required, min 3 characters
  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = 'Subjek wajib diisi.';
  } else if (data.subject.trim().length < 3) {
    errors.subject = 'Subjek minimal 3 karakter.';
  }

  // Validate message: required, min 10 characters
  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Pesan wajib diisi.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Pesan minimal 10 karakter.';
  }

  return errors;
}

/**
 * Returns true if the form data is valid (no errors).
 */
export function isFormValid(data: FormState): boolean {
  return Object.keys(validateContactForm(data)).length === 0;
}

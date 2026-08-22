import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

// Mock @emailjs/browser
vi.mock('@emailjs/browser', () => ({
  send: vi.fn(),
}));

describe('ContactForm — Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Validation', () => {
    it('shows error when email is empty on submit', async () => {
      render(<ContactForm />);
      const submitBtn = screen.getByRole('button', { name: /kirim pesan/i });
      await userEvent.click(submitBtn);
      expect(screen.getByText(/email wajib diisi/i)).toBeTruthy();
    });

    it('shows error when email format is invalid', async () => {
      render(<ContactForm />);
      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(emailInput, 'invalid-email');
      const submitBtn = screen.getByRole('button', { name: /kirim pesan/i });
      await userEvent.click(submitBtn);
      expect(screen.getByText(/format email tidak valid/i)).toBeTruthy();
    });

    it('shows error when name is empty on submit', async () => {
      render(<ContactForm />);
      const submitBtn = screen.getByRole('button', { name: /kirim pesan/i });
      await userEvent.click(submitBtn);
      expect(screen.getByText(/nama wajib diisi/i)).toBeTruthy();
    });

    it('shows error when message is too short', async () => {
      render(<ContactForm />);
      const messageInput = screen.getByRole('textbox', { name: /^pesan/i });
      await userEvent.type(messageInput, 'short');
      const submitBtn = screen.getByRole('button', { name: /kirim pesan/i });
      await userEvent.click(submitBtn);
      expect(screen.getByText(/pesan minimal 10 karakter/i)).toBeTruthy();
    });

    it('clears field error when user starts typing', async () => {
      render(<ContactForm />);
      const submitBtn = screen.getByRole('button', { name: /kirim pesan/i });
      await userEvent.click(submitBtn);
      expect(screen.getByText(/nama wajib diisi/i)).toBeTruthy();

      const nameInput = screen.getByLabelText(/nama/i);
      await userEvent.type(nameInput, 'A');
      expect(screen.queryByText(/nama wajib diisi/i)).toBeNull();
    });
  });

  describe('Submit', () => {
    it('shows success message when EmailJS resolves', async () => {
      const emailjs = await import('@emailjs/browser');
      vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: 'OK' });

      render(<ContactForm />);

      await userEvent.type(screen.getByLabelText(/nama/i), 'Rafly Test');
      await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/subjek/i), 'Test Subject');
      await userEvent.type(screen.getByRole('textbox', { name: /^pesan/i }), 'This is a test message that is long enough.');

      await userEvent.click(screen.getByRole('button', { name: /kirim pesan/i }));

      await waitFor(() => {
        expect(screen.getByText(/pesan terkirim/i)).toBeTruthy();
      });
    });

    it('shows error message when EmailJS rejects', async () => {
      const emailjs = await import('@emailjs/browser');
      vi.mocked(emailjs.send).mockRejectedValueOnce(new Error('Network error'));

      render(<ContactForm />);

      await userEvent.type(screen.getByLabelText(/nama/i), 'Rafly Test');
      await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/subjek/i), 'Test Subject');
      await userEvent.type(screen.getByRole('textbox', { name: /^pesan/i }), 'This is a test message that is long enough.');

      await userEvent.click(screen.getByRole('button', { name: /kirim pesan/i }));

      await waitFor(() => {
        expect(screen.getByText(/gagal mengirim pesan/i)).toBeTruthy();
      });
    });
  });
});

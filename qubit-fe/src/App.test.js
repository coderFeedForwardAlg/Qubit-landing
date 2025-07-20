import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  fetch.resetMocks();
});

it('allows a user to join the waitlist', async () => {
  fetch.mockResponseOnce(JSON.stringify({ success: true }));

  render(<App />);

  // Click the "Join Waitlist" button to show the form
  fireEvent.click(screen.getByText('Join Waitlist'));

  // Fill out the form
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test User' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });

  // Submit the form
  fireEvent.click(screen.getByText('Join Waitlist'));

  // Wait for the success message
  await waitFor(() => {
    expect(screen.getByText('Thank You!')).toBeInTheDocument();
  });
});
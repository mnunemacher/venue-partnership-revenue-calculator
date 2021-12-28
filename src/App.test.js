import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator form', () => {
  render(<App />);
  const numberOfEvents = screen.getByText(/events per year/i);
  const guestCount = screen.getByText(/guest count/i);
  const bevCost = screen.getByText(/beverage cost per person/i);
  expect(numberOfEvents).toBeInTheDocument();
  expect(guestCount).toBeInTheDocument();
  expect(bevCost).toBeInTheDocument();
});

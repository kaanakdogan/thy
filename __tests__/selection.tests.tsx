import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Selection } from '@/app/components/selection';

const routerPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: routerPush,
    };
  },
}));

jest.mock('../src/app/actions', () => ({
  async getFlightsUrl(arrival: string, departure: string) {
    if (departure !== 'istanbul') {
      throw new Error('Kalkış noktası geçerli değil.');
    }

    if (arrival !== 'antalya') {
      throw new Error('Varış noktası geçerli değil.');
    }

    return { departureCode: 'IST', arrivalCode: 'AYT' };
  },
}));

test('Selection without inputs', async () => {
  render(<Selection />);

  const fromInput = screen.getByPlaceholderText('Nereden');
  const toInput = screen.getByPlaceholderText('Nereye');
  const submitBtn = screen.getByTestId('selection-submit');

  expect(fromInput).toBeDefined();
  expect(toInput).toBeDefined();
  expect(submitBtn).toBeDefined();

  fireEvent.click(submitBtn);

  //should error modal open
  await waitFor(() => {
    const modal = screen.getByTestId('modal-selection');
    const errorMsg = screen.getByText('Kalkış noktası geçerli değil.');
    expect(modal).toBeInTheDocument();
    expect(errorMsg).toBeInTheDocument();
  });
});

test('Selection with only correct from input', async () => {
  render(<Selection />);

  const fromInput = screen.getByPlaceholderText('Nereden');
  const toInput = screen.getByPlaceholderText('Nereye');
  const submitBtn = screen.getByTestId('selection-submit');

  expect(fromInput).toBeDefined();
  expect(toInput).toBeDefined();
  expect(submitBtn).toBeDefined();

  await waitFor(() =>
    fireEvent.change(fromInput, { target: { value: 'istanbul' } })
  );
  fireEvent.click(submitBtn);

  await waitFor(() => {
    const modal = screen.getByTestId('modal-selection');
    const errorMsg = screen.getByText('Varış noktası geçerli değil.');
    expect(modal).toBeInTheDocument();
    expect(errorMsg).toBeInTheDocument();
  });
});

test('Selection with correct inputs', async () => {
  render(<Selection />);

  const fromInput = screen.getByPlaceholderText('Nereden');
  const toInput = screen.getByPlaceholderText('Nereye');
  const submitBtn = screen.getByTestId('selection-submit');

  expect(fromInput).toBeDefined();
  expect(toInput).toBeDefined();
  expect(submitBtn).toBeDefined();

  await waitFor(() => {
    fireEvent.change(fromInput, { target: { value: 'istanbul' } });
    fireEvent.change(toInput, { target: { value: 'antalya' } });
  });
  fireEvent.click(submitBtn);

  await waitFor(() => {
    expect(routerPush).toHaveBeenCalledTimes(1);
  });
});

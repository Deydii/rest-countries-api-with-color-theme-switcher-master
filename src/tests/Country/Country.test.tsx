import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route} from 'react-router-dom';
import Country from '../../components/Country';

describe('Country component', () => {

  const countryComponent = 
   <MemoryRouter initialEntries={["/country/AGO"]}>
     <Routes>
        <Route path='/country/:code' element={<Country />} />
     </Routes>
  </MemoryRouter>

  test('It should display spinner when loading', () => {
    render(countryComponent);
    const spinnerMessage = screen.getByText(/loading.../i);
    expect(spinnerMessage).toBeInTheDocument();
  });

  test('It should render country component with data', async () => {
    render(countryComponent);
    const text = await screen.findByText(/luanda/i);
    expect(text).toBeInTheDocument();
  });

  test('It should change URL when user clicked on a border countries button', async () => {
    render(countryComponent);

    const button = await screen.findByRole('button', {name: /zambia/i});
    userEvent.click(button);

    const zambiaCapital = await screen.findByText(/lusaka/i);
    expect(zambiaCapital).toBeInTheDocument();
  });
});



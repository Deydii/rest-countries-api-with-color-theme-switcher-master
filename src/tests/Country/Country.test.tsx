import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route} from 'react-router-dom';
import { CountriesContextProvider } from '../../context/countriesContext';
import { ThemeContextProvider } from '../../context/themeContext';
import Country from '../../components/Country';
import { rest } from 'msw';
import { server } from '../../mocks/server';

describe('Country component', () => {

  const countryComponent = 
   <MemoryRouter initialEntries={["/country/AGO"]}>
     <Routes>
        <Route path='/country/:code' element={
          <ThemeContextProvider>
            <CountriesContextProvider>
              <Country />
            </CountriesContextProvider>
          </ThemeContextProvider>
        } />
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

  test('It shows error message if the request fails', async () => {
    server.use(
      rest.get("https://restcountries.com/v2/alpha/AGO", (req, res, ctx) => {
        return res(
          ctx.status(500)
        );
      })
    );
    
    render(countryComponent);
    const errorMessage = await screen.findByText(/The request unfortunately failed. Please try later./i);
    expect(errorMessage).toBeInTheDocument();
  })
});
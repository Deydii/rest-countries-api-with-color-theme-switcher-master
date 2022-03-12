import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from '../../context/themeContext';
import { CountriesContextProvider } from '../../context/countriesContext';
import App from '../../components/App/';
import { rest } from 'msw';
import { server } from '../../mocks/server';

describe('App component', () => {

  const appComponent = 
    <BrowserRouter>
      <ThemeContextProvider>
        <CountriesContextProvider>
            <App />
        </CountriesContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>

  test('It should display skeletons when loading', () => {
    render(appComponent);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(4);
  });

  test('It should render cards after loading', async () => {
    render(appComponent);
    const cards = await screen.findAllByTestId("cards__infos");
    expect(cards).toHaveLength(250);
  });

  test('User can change theme', () => {
    render(appComponent);

    const themeButton = screen.getByRole("button");
    userEvent.click(themeButton);
    expect(themeButton).toHaveClass("header__button header__button--dark");
  });

  test('User can search a country with the search bar', async () => {
    render(appComponent);

    await screen.findAllByTestId("cards__infos");

    const input = screen.getByRole("textbox");
    userEvent.type(input, "greece");
    expect(input).toHaveValue("greece");

    const card  = await screen.findAllByTestId("cards__infos");
    expect(card).toHaveLength(1);

    const capital = await screen.findByText(/athens/i);
    expect(capital).toBeInTheDocument();
  });

  test('It should have an error message when a country not found', async () => {
    render(appComponent);

    await screen.findAllByTestId("cards__infos");
    const input = screen.getByRole("textbox");
    userEvent.type(input, "mozembique");

    const errorMessage = screen.getByText(/no results found.../i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('User can filter by region', async () => {
    render(appComponent);

    await screen.findAllByTestId("cards__infos");

    const filter = screen.getAllByRole('listitem');
    const searchedRegion = filter.find(region => region.id === "africa")
    if (searchedRegion) {
      userEvent.click(searchedRegion);
    }
    const cards = await screen.findAllByTestId("cards__infos");
    expect(cards).toHaveLength(60);
  });

  test('User can click on a card to get more infos', async () => {
    render(appComponent);

    await screen.findAllByTestId("cards__infos");

    const mexicoCard = screen.getByText(/mexico city/i);
    userEvent.click(mexicoCard);
    await screen.findByText(/mexican peso/i);

    expect(window.location.pathname).toEqual("/country/MEX");

    const borderButtons = await screen.findAllByTestId("border");
    expect(borderButtons).toHaveLength(3);

    const belizeButton = screen.getByText(/belize/i);
    userEvent.click(belizeButton);
    await screen.findByText(/belmopan/i);
    expect(window.location.pathname).toEqual("/country/BLZ");

    const backButton = screen.getByRole("button", { name : /back/i });
    userEvent.click(backButton);
    await screen.findAllByTestId("cards__infos");
    expect(window.location.pathname).toEqual("/");
  });

  test('It shows error message if the request fails', async () => {
    server.use(
      rest.get("https://restcountries.com/v2/all", (req, res, ctx) => {
        return res(
          ctx.status(500)
        );
      })
    );
    
    render(appComponent);
    const errorMessage = await screen.findByText(/The request unfortunately failed. Please try later./i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("cards__error");
  });
})


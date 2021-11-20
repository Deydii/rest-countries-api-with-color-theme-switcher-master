import { render, screen } from '@testing-library/react';
import Card from '../../components/Cards/Card';

describe('Cards component', () => {

  const props = {
    name: "Belgium",
    flags: {
    svg: "https://flagcdn.com/be.svg",
    png: "https://flagcdn.com/w320/be.png"
    },
    population: 11555997,
    region: "Europe",
    capital: "Brussels"
  };
  
  test('It should render card component', () => { 
    render(
      <Card
        name={props.name}
        flags={props.flags}
        population={props.population}
        region={props.region}
        capital={props.capital}
      />
    );
  });

  test('It should display country\s informations', () => {
    render(
      <Card
        name={props.name}
        flags={props.flags}
        population={props.population}
        region={props.region}
        capital={props.capital}
      />
    );

    const name = screen.getByText(props.name);
    const population = screen.getByText(props.population.toLocaleString("en-US"));
    const region = screen.getByText(props.region);
    const capital = screen.getByText(props.capital);

    expect(name).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(region).toBeInTheDocument();
    expect(capital).toBeInTheDocument();
  })

  test('It should display country\'s flag', () => {
    render(
      <Card
        name={props.name}
        flags={props.flags}
        population={props.population}
        region={props.region}
        capital={props.capital}
      />
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", props.flags.png);
  })
});

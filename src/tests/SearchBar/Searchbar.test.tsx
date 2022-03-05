import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../components/SearchBar'

describe('Search bar component', () => {

  test('User can use the search bar to search a country', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('textbox');
    userEvent.type(input, "Ghana");
    expect(input).toHaveValue("Ghana")
  });
});
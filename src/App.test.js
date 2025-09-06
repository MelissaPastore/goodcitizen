import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './Components/App';
import store from './store';

test('renders Good Citizen Assistant header', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const headerElement = screen.getByText(/Good Citizen Assistant/i);
  expect(headerElement).toBeInTheDocument();
});

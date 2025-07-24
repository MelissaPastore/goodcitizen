import { render } from '@testing-library/react';
import Welcome from './Components/Welcome';

test('renders welcome component', () => {
  render(<Welcome />);
  // Just check that it renders without crashing
});

import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders the footer with copyright', () => {
    render(<Footer />);
    expect(screen.getByText('© 2024 StackPay. All rights reserved.')).toBeInTheDocument();
  });
});

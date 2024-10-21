import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../index';

describe('MainPage', () => {
  it('renders the heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Welcome to the Home Page')).toBeTruthy();
  });
});

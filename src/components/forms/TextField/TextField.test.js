/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import TextField from './index';
import { render, screen } from '../../../infra/tests/testUtils';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Anso"
        onChange={() => {}}
        name="nome"
      />,
    );
    const textField = screen.getByPlaceholderText(/nome/i);

    expect(textField).toMatchSnapshot();
  });
});

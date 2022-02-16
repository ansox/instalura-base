/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
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

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      test('the value must be updated', () => {
        const onChangeMock = jest.fn();
        render(
          <TextField
            placeholder="nome"
            value=""
            onChange={onChangeMock}
            name="nome"
            isTouched
          />,
        );

        const inputNome = screen.getByPlaceholderText(/nome/i);

        user.type(inputNome, 'Anso');

        expect(onChangeMock).toHaveBeenCalledTimes(4);
      });
    });
  });

  describe('when field is invalid', () => {
    test('displays the respective error messsage', () => {
      render(
        <TextField
          placeholder="Email"
          value="ansoemail.com"
          onChange={() => {}}
          name="email"
          isTouched
          error="O campo email é obrigatório"
        />,
      );

      const inputEmail = screen.getByPlaceholderText(/email/i);
      expect(inputEmail).toHaveValue('ansoemail.com');
      expect(screen.getByRole('alert')).toHaveTextContent('O campo email é obrigatório');
      expect(inputEmail).toMatchSnapshot();
    });
  });
});

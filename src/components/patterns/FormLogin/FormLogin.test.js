/**
 * @jest-environment jsdom
 */

import React from 'react';
import user from '@testing-library/user-event';
import FormLogin from './index';
import {
  render, act, screen, waitFor,
} from '../../../infra/tests/testUtils';

const onSubmit = jest.fn();
onSubmit.mockImplementation((event) => event.preventDefault());

describe('<FormLogin />', () => {
  describe('when from fields are valid', () => {
    test('complete the submission', async () => {
      await act(async () => {
        render(
          <FormLogin
            onSubmit={onSubmit}
          />,
        );
      });

      expect(screen.getByRole('button')).toBeDisabled();

      const inputUsuario = screen.getByPlaceholderText('Usuário');
      user.type(inputUsuario, 'Anso');
      await waitFor(() => {
        expect(inputUsuario).toHaveValue('Anso');
      });

      const inputSenha = screen.getByPlaceholderText('Senha');
      user.type(inputSenha, 'senhateste');
      await waitFor(() => {
        expect(inputSenha).toHaveValue('senhateste');
      });

      expect(screen.getByRole('button')).not.toBeDisabled();

      user.click(screen.getByRole('button'));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when from fields are invalid', () => {
    test('displays the respective errors', async () => {
      render(<FormLogin onSubmit={onSubmit} />);

      const inputUsuario = screen.getByPlaceholderText('Usuário');
      inputUsuario.focus();
      inputUsuario.blur();

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.getByRole('alert')).toHaveTextContent('Preencha ao menos 3 caracteres');
    });
  });
});

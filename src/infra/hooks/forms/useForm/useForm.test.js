/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks';
import useForm from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the value', () => {
      const { result } = renderHook(() => useForm({
        initialValues: {
          nome: 'Anso',
        },
      }));

      expect(result.current.values).toEqual({ nome: 'Anso' });

      const event = {
        target: {
          getAttribute: () => 'nome',
          value: 'Julio',
        },
      };

      act(() => {
        result.current.handleChange(event);
      });

      expect(result.current.values).toEqual({ nome: 'Julio' });
    });
  });
});

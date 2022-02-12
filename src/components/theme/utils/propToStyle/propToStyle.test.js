import propToStyle from './index';

describe('propToStyle()', () => {
  describe('when receibes a simple argument', () => {
    test('and it is a string', () => {
      const propToStyleResult = propToStyle('textAlign');

      const componentProps = { textAlign: 'center' };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toEqual({ textAlign: 'center' });
    });

    test('and it is a number', () => {
      const propToStyleResult = propToStyle('opacity');

      const componentProps = { opacity: 1 };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toEqual({ opacity: 1 });
    });
  });

  describe('when receives an argument with breakpoints', () => {
    test('renders one breakpoint resolution', () => {
      const propToStyleResult = propToStyle('textAlign');

      const componentProps = { textAlign: { xs: 'center' } };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toMatchSnapshot();
    });

    test('renders two or more breakpoint resolution', () => {
      const propToStyleResult = propToStyle('textAlign');

      const componentProps = { textAlign: { xs: 'center', md: 'right' } };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toMatchSnapshot();
    });
  });
});

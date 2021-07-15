import { removeEmptyPropertiesFromObj } from './remove-empty-properties-from-obj';

describe('removeEmptyPropertiesObj', () => {
  it('should remove all omitted properties from object', () => {
    const colors = {
      green: 'hey',
      yellow: undefined,
      blue: '',
      darkBlue: 'world',
      pink: 234234234,
    };

    expect(removeEmptyPropertiesFromObj(colors)).toEqual({ green: 'hey', pink: 234234234, darkBlue: 'world' });
  });

  it('should return empty object if empty object passed', () => {
    expect(removeEmptyPropertiesFromObj({})).toEqual({});
  });
});

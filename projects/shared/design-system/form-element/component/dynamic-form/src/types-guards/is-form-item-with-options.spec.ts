import { isFormItemWithOptions } from './is-form-item-with-options';

describe('isFormItemWithOptions', () => {
  it('should return true if the item has options', () => {
    // Given a form item with options
    const item = {
      type: 'radio',
      options: {
        items: {
          'item-1': { label: 'dynamic-forms.radio.items.item-1', value: 'option-1' },
          'item-2': { label: 'dynamic-forms.radio.items.item-2', value: 'option-2' },
        },
      }
    };

    // When checking if the item is a form item with options
    const result = isFormItemWithOptions(item);

    // Then the result should be true
    expect(result).toBe(true);
  });

  it('should return true if the item has options with optionAction', () => {
    // Given a form item with options and optionAction
    const item = {
      type: 'radio',
      options: {
        optionAction: 'dynamic-forms.radio.optionAction',
      }
    };

    // When checking if the item is a form item with options
    const result = isFormItemWithOptions(item);

    // Then the result should be true
    expect(result).toBe(true);
  });

  it('should return false if the item has no options', () => {
    // Given a form item without options
    const item = {
      type: 'text',
    };

    // When checking if the item is a form item with options
    const result = isFormItemWithOptions(item);

    // Then the result should be false
    expect(result).toBe(false);
  });

  it('should return false if the item has options but no items nor optionAction', () => {
    // Given a form item with options but no items
    const item = {
      type: 'radio',
      options: {}
    };

    // When checking if the item is a form item with options
    const result = isFormItemWithOptions(item);

    // Then the result should be false
    expect(result).toBe(false);
  });
});

import { type Meta, type StoryObj } from '@storybook/angular';
import { DynamicFormComponent } from '../dynamic-form.component';
import { DynamicFormElementGenerators } from './dynamic-form-element-generator';

const meta: Meta<DynamicFormComponent> = {
  component: DynamicFormComponent,
  title: 'Components/Dynamic Form/Main Component',
  argTypes: {
    submitted: {
      action: 'submitted',
    }
  },
};
export default meta;
type Story = StoryObj<DynamicFormComponent>;

export const AccountCreationExample: Story = {
  args: {
    elements: {
      login: DynamicFormElementGenerators.input.text({
        position: { x: 0, y: 0 },
        type: 'input',
        clearable: true,
        field: {
          required: true,
        },
        inputType: 'text',
        label: 'Login',
        placeholder: 'Enter your login',
        prefix: { icon: 'person' },
        validation: {
          regex: '^[a-zA-Z0-9]{3,}$',
          errorValidationMessage: 'Login must contain at least 3 characters and only letters and numbers',
        }
      }),
      password: DynamicFormElementGenerators.input.text({
        position: { x: 0, y: 1 },
        type: 'input',
        clearable: true,
        field: {
          required: true,
        },
        inputType: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        prefix: { icon: 'lock' },
        validation: {
          regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
          errorValidationMessage: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number',
        }
      }),
      confirmPassword: DynamicFormElementGenerators.input.text({
        position: { x: 0, y: 2 },
        type: 'input',
        clearable: true,
        field: {
          required: true,
        },
        inputType: 'password',
        label: 'Confirm password',
        placeholder: 'Confirm your password',
        prefix: { icon: 'lock' },
        validation: {
          regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
          errorValidationMessage: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number',
        }
      }),
      email: DynamicFormElementGenerators.input.text({
        position: { x: 0, y: 3 },
        type: 'input',
        clearable: true,
        field: {
          required: true,
        },
        inputType: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        prefix: { icon: 'mail' },
        validation: {
          regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          errorValidationMessage: 'Email must be a valid email address',
        }
      }),
      passwordRecoveryQuestion: DynamicFormElementGenerators.select({
        position: { x: 0, y: 4 },
        type: 'select',
        field: {
          required: true,
        },
        label: 'Password recovery question',
        placeholder: 'Select your password recovery question',
        options: {
          items: {
            motherMaidenName: {
              label: 'What is your mother\'s maiden name?',
              value: 'motherMaidenName',
            },
            firstPetName: {
              label: 'What is the name of your first pet?',
              value: 'firstPetName',
            },
            favoriteMovie: {
              label: 'What is your favorite movie?',
              value: 'favoriteMovie',
            },
          }
        },
      }),
      passwordRecoveryAnswer: DynamicFormElementGenerators.input.text({
        position: { x: 0, y: 5 },
        type: 'input',
        clearable: true,
        field: {
          required: true,
        },
        inputType: 'text',
        label: 'Password recovery answer',
        placeholder: 'Enter your password recovery answer',
        prefix: { icon: 'help' },
      }),
    }
  },
};

export const TryYourself: Story = {
  args: {
    elements: {}
  }
};

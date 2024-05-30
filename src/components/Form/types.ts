export interface Option {
  label: string;
  value: string;
  condition?: {
    text: string;
    type: string;
  };
}

export interface FormField {
  text: string;
  type: 'text' | 'checkbox' | 'dropdown' | 'radio' | 'multiSelect';
  placeholder?: string;
  validate?: string;
  errorMessage?: string;
  defaultValue?: boolean;
  options?: Option[];
}

export interface RenderFieldProps {
  child: FormField;
  fieldName: string;
}

export interface FormDataSection {
  id: number;
  text: string;
  type: string;
  children: FormField[];
}

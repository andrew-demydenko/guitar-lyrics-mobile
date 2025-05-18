export type TInputFields<T> = Record<
  string,
  {
    label: string;
    name: keyof T;
    rules?: any;
    placeholder?: string;
    type?: string;
    options?: any[];
  }
>;

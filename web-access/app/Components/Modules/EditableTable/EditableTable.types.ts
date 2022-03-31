export interface BaseData {
  key: string;
}

export interface EditableTableProps<T> {
  originData: T[];
  empty: T;
  adminView: boolean;
  title?: string;
  border?: boolean;
  hasAddButton?: boolean;
  columns: {
    title?: string;
    dataIndex: string;
    width?: string;
    editable?: boolean;
    onCell?: (record: T, index: number) => object;
  }[];
  updateCallback?: (item: T) => Promise<string>;
  deleteCallback?: (key: string) => Promise<boolean>;
  updateMiddleware?: (item: T) => T;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text';
  index: number;
  children: React.ReactNode;
}

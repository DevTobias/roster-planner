export interface BaseData {
  key: string;
}

export interface EditableTableProps<T> {
  originData: T[];
  title: string;
  empty: T;
  columns: {
    title: string;
    dataIndex: string;
    width: string;
    editable: boolean;
  }[];
  updateCallback: (item: T) => Promise<boolean>;
  deleteCallback: (key: string) => Promise<boolean>;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text';
  index: number;
  children: React.ReactNode;
}
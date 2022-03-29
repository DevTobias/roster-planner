export interface BaseData {
  key: string;
}

export interface EditableTableProps<T> {
  originData: T[];
  columns: {
    title: string;
    dataIndex: string;
    width: string;
    editable: boolean;
  }[];
  updateCallback: (item: T) => void;
  deleteCallback: (key: string) => void;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text';
  index: number;
  children: React.ReactNode;
}

import { FunctionComponent, useState } from 'react';
import { Table, Input, InputNumber, Form, Button } from 'antd';
import { CloseOutlined, EditFilled, SaveFilled } from '@ant-design/icons';

import { BaseData, EditableTableProps, EditableCellProps } from './Table.types';

/**
 * Override the table cell based on its editable state.
 */
const EditableCell: FunctionComponent<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  if (editing) {
    return (
      <td {...restProps}>
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {inputNode}
        </Form.Item>
      </td>
    );
  }

  return <td {...restProps}>{children}</td>;
};

/**
 * Editable table component.
 */
const EditableTable = <T extends BaseData>({
  originData,
  columns: originColumns,
  updateCallback,
}: EditableTableProps<T>) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: T) => record.key === editingKey;

  /**
   * Marks the selected row as editable.
   */
  const edit = (record: Partial<T> & { key: React.Key }) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  /**
   * Cancels the current editing of a row.
   */
  const cancel = () => {
    setEditingKey('');
  };

  /**
   * Saves the currently edited row to the state.
   */
  const save = async (key: React.Key) => {
    try {
      // Validate the form data and throw error if failed
      const row = (await form.validateFields()) as T;

      // Make a copy of the data and find the edited row
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      // Override the old row data
      newData.splice(index, 1, {
        ...newData[index],
        ...row,
      });

      updateCallback(newData[index]);

      // Safe the new data in state to render it
      setData(newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    ...originColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: T) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }),
    {
      dataIndex: 'operation',
      render: (_: undefined, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="space-x-2">
            <Button
              style={{ border: 'none' }}
              shape="circle"
              icon={<SaveFilled />}
              onClick={() => save(record.key)}
            />
            <Button
              style={{ border: 'none' }}
              shape="circle"
              icon={<CloseOutlined />}
              onClick={cancel}
            />
          </span>
        ) : (
          <Button
            style={{ border: 'none' }}
            shape="circle"
            icon={<EditFilled />}
            onClick={() => edit(record)}
          />
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={columns}
        pagination={{
          onChange: cancel,
          defaultPageSize: 7,
        }}
      />
    </Form>
  );
};

export default EditableTable;

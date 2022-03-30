import React, { FunctionComponent, useState } from 'react';
import { Table, Input, Form, Button } from 'antd';
import {
  CloseOutlined,
  EditFilled,
  SaveFilled,
  DeleteFilled,
  PlusOutlined,
} from '@ant-design/icons';

import {
  BaseData,
  EditableTableProps,
  EditableCellProps,
} from './EditableTable.types';

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
  if (editing) {
    return (
      <td {...restProps}>
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          <Input bordered={false} style={{ padding: 0 }} allowClear />
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
  title,
  empty,
  adminView,
  columns: originColumns,
  updateCallback,
  deleteCallback,
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

      // Persist the change in the database and stop if an error occurred
      const uid = await updateCallback(newData[index]);
      if (!uid) return;

      newData[index].key = uid;

      // Safe the new data in state to render it
      setData(newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  /**
   * Saves the item with the given key.
   */
  const deleteItem = async (key: string) => {
    // Make a copy of the data and find the edited row
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    // Delete the user from the array
    newData.splice(index, 1);

    // Persist the change in the database and stop if an error occurred
    // If the key is -1, it just deletes an empty row, so no need for firebase op
    if (key !== '-1') {
      const worked = await deleteCallback(key);
      if (!worked) return;
    }

    // Safe the new data in state to render it
    setData(newData);
  };

  /**
   * Appends am empty row to the end of the table and sets the
   * edit mode to it.
   */
  const addItem = async () => {
    // If already added an empty row, dont add another one
    if (editingKey == '-1') return;

    const newData = [...data];

    const item = { ...empty };

    // Add the empty row to the end and set its key to -1, to identify
    // it as empty row
    newData.push(item);
    setData(newData);
    edit(item);
  };

  /**
   * Cancels the current editing of a row.
   */
  const cancel = () => {
    // If an empty row is getting canceled, just delete it instantly
    if (editingKey === '-1') {
      deleteItem('-1');
    }

    setEditingKey('');
  };

  /**
   * @returns Returns the admin control buttons (delete, edit).
   */
  const getAdminButtons = () => {
    return {
      dataIndex: 'operation',
      render: (_: undefined, record: T) => {
        const editable = isEditing(record);

        if (editable) {
          return (
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
          );
        }

        return (
          <span className="space-x-2">
            <Button
              style={{ border: 'none' }}
              shape="circle"
              icon={<EditFilled />}
              onClick={() => edit(record)}
            />
            <Button
              style={{ border: 'none' }}
              shape="circle"
              icon={<DeleteFilled />}
              onClick={() => deleteItem(record.key)}
            />
          </span>
        );
      },
    };
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
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }),
    ...(adminView ? [getAdminButtons()] : []),
  ];

  return (
    <Form form={form} component={false}>
      <div className="flex items-center space-x-6">
        <h2 className="text-neutral-800 font-semibold text-header3m">
          {title}
        </h2>
        {adminView && (
          <Button
            style={{ border: 'none', marginBottom: 10 }}
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={addItem}
          />
        )}
      </div>

      <Table
        rowSelection={{
          selectedRowKeys: [editingKey],
          hideSelectAll: true,
          columnWidth: '1px',
          renderCell: () => <></>,
        }}
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

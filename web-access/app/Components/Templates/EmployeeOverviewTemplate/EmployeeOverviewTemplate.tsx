import { FunctionComponent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import EditableTable from '@Modules/EditableTable/EditableTable';
import { compareString } from '@Utils/strings';
import { EmptyUser, User, persistUser, deleteUser } from '@Lib/firebaseClient';
import { auth } from '@Lib/firebase';

import { EmployeeOverviewTemplateProps } from './EmployeeOverviewTemplate.types';

const EmployeeOverviewTemplate: FunctionComponent<
  EmployeeOverviewTemplateProps
> = ({ users }) => {
  const [user] = useAuthState(auth);

  const cols = [
    {
      dataIndex: 'index',
      width: '30px',
      defaultSortOrder: 'ascend',
      editable: true,
      sorter: (a: User, b: User) => a.index - b.index,
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      width: '100px',
      editable: true,
      sorter: (a: User, b: User) => compareString(a.firstName, b.firstName),
    },
    {
      title: 'Nachname',
      dataIndex: 'lastName',
      width: '100px',
      editable: true,
      sorter: (a: User, b: User) => compareString(a.lastName, b.lastName),
    },
    {
      title: 'Stunden',
      dataIndex: 'hours',
      width: '50px',
      editable: true,
      sorter: (a: User, b: User) => parseFloat(a.hours) - parseFloat(b.hours),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      width: '200px',
      editable: true,
      sorter: (a: User, b: User) => compareString(a.position, b.position),
    },
  ];

  return (
    <main className="px-5 py-20 min-h-screenInner flexable justify-center">
      <EditableTable
        adminView={user !== null}
        originData={users}
        columns={cols}
        updateCallback={persistUser}
        deleteCallback={deleteUser}
        title="Mitarbeiterübersicht"
        empty={EmptyUser}
        hasAddButton
      />
    </main>
  );
};

export default EmployeeOverviewTemplate;

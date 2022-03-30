import { FunctionComponent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import EditableTable from '@Modules/EditableTable/EditableTable';
import { auth } from '@Lib/firebase';

import { RosterTemplateProps } from './RosterTemplate.types';

const RosterTemplate: FunctionComponent<RosterTemplateProps> = ({
  rosterData,
}) => {
  const [user] = useAuthState(auth);

  const cols = [
    {
      dataIndex: 'details',
      width: '200px',
    },
    {
      title: '+/-',
      dataIndex: 'balanceOld',
      width: '75px',
      onCell: (_: unknown, index: number) => ({
        rowSpan: index % 2 == 0 ? 2 : 0,
      }),
    },
    {
      title: 'Urlaub',
      dataIndex: 'vacationOld',
      width: '75px',
      onCell: (_: unknown, index: number) => ({
        rowSpan: index % 2 == 0 ? 2 : 0,
      }),
    },
    {
      title: 'Montag',
      dataIndex: 'monday',
      width: '150px',
      editable: true,
    },
    {
      title: 'Dienstag',
      dataIndex: 'tuesday',
      width: '150px',
      editable: true,
    },
    {
      title: 'Mittwoch',
      dataIndex: 'wednesday',
      width: '150px',
      editable: true,
    },
    {
      title: 'Donnerstag',
      dataIndex: 'thursday',
      width: '150px',
      editable: true,
    },
    {
      title: 'Freitag',
      dataIndex: 'friday',
      width: '150px',
      editable: true,
    },
    {
      title: '+/-',
      dataIndex: 'balanceNew',
      width: '75px',
      onCell: (_: unknown, index: number) => ({
        rowSpan: index % 2 == 0 ? 2 : 0,
      }),
    },
    {
      title: 'Urlaub',
      dataIndex: 'vacationNew',
      width: '75px',
      onCell: (_: unknown, index: number) => ({
        rowSpan: index % 2 == 0 ? 2 : 0,
      }),
    },
  ];

  return (
    <main className="px-5 py-20 min-h-screenInner flexable justify-center">
      <EditableTable
        adminView={user !== null}
        originData={rosterData}
        columns={cols}
        updateCallback={null}
        deleteCallback={null}
        title="Mitarbeiterübersicht"
        empty={null}
        border
      />
    </main>
  );
};

export default RosterTemplate;

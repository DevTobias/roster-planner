import 'moment/locale/de';
import { FunctionComponent, useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import { uid as keyId } from 'react-uid';
import moment from 'moment';
import locale from 'antd/lib/locale/de_DE';
import { doc, updateDoc, setDoc } from '@firebase/firestore';
import toast from 'react-hot-toast';

import EditableTable from '@Modules/EditableTable/EditableTable';
import { auth, firestore } from '@Lib/firebase';
import { RosterTemplateProps, RosterEntry } from './RosterTemplate.types';
import { createTimeDif } from '@Utils/strings';
import { getRosterData } from '@Lib/firebaseClient';

const RosterTemplate: FunctionComponent<RosterTemplateProps> = ({
  rosterData,
}) => {
  const [user] = useAuthState(auth);
  const [date, setDate] = useState(moment());
  const [data, setData] = useState(rosterData);

  const cols = [
    {
      dataIndex: 'details',
      width: '200px',
      onCell: (_: unknown, index: number) => ({
        rowSpan: index % 2 == 0 ? 2 : 0,
      }),
      render: (text) => {
        const [first, second] = text.split('-');
        return (
          <>
            {first}
            <br />
            {second}
          </>
        );
      },
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

  const updateRoster = async (roster: RosterEntry) => {
    const { key, monday, tuesday, wednesday, thursday, friday } = roster;
    const [uid, row] = key.split('-');

    const rosterId = `kw${moment().week()}_${moment().year()}`;

    try {
      await setDoc(doc(firestore, `rosters/${rosterId}/${uid}/meta`), {
        balance: '',
        vacation: '',
      });

      await setDoc(doc(firestore, `rosters/${rosterId}/${uid}/notes`), {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
      });

      await setDoc(doc(firestore, `rosters/${rosterId}/${uid}/times`), {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
      });

      await updateDoc(doc(firestore, `rosters/${rosterId}/${uid}/${row}`), {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
      });

      toast.success('Mitarbeiterdaten erfolgreich aktualisiert.');
      return key;
    } catch (e) {
      console.log(e);
      toast.error('Mitarbeiterdaten konnten nicht gespeichert werden.');
      return '';
    }
  };

  const updateMiddleware = (rosterEntry: RosterEntry) => {
    const { monday, tuesday, wednesday, thursday, friday } = rosterEntry;

    return {
      ...rosterEntry,
      monday: createTimeDif(monday),
      tuesday: createTimeDif(tuesday),
      wednesday: createTimeDif(wednesday),
      thursday: createTimeDif(thursday),
      friday: createTimeDif(friday),
    };
  };

  return (
    <main className="px-5 py-20 min-h-screenInner flexable justify-center">
      <div className="flex justify-between">
        <h2 className="text-neutral-800 font-semibold text-header3m m-0">
          Dienstplan (KW {date.week()} vom{' '}
          {date.locale('de').startOf('week').format('Do Mo YY')} -{' '}
          {date.locale('de').endOf('week').format('Do Mo YY')})
        </h2>
        <ConfigProvider locale={locale}>
          <DatePicker
            onChange={async (_date) => {
              setDate(_date);
              setData(await getRosterData(`kw${_date.week()}_${_date.year()}`));
            }}
            value={date}
            picker="week"
            defaultValue={moment()}
          />
        </ConfigProvider>
      </div>

      <EditableTable
        key={keyId(data)}
        adminView={user !== null}
        originData={data}
        columns={cols}
        updateCallback={updateRoster}
        updateMiddleware={updateMiddleware}
        empty={null}
        border
      />
    </main>
  );
};

export default RosterTemplate;

import {
  AimOutlined,
  HourglassOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FunctionComponent } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { firestore, auth } from '@Lib/firebase';

type SubmitData = {
  hours: string;
  position: string;
  username: string;
};

const RegisterForm: FunctionComponent = () => {
  const prepareName = (name: string) => {
    return name
      .toLowerCase()
      .replaceAll('ä', 'ae')
      .replaceAll('ö', 'oe')
      .replaceAll('ü', 'ue');
  };

  const generateEmail = (name: string) => {
    const [firstName, lastName] = prepareName(name).split(' ');
    return `${firstName}.${lastName}@kita.de`;
  };

  const generatePassword = (name: string) => {
    const [firstName, lastName] = prepareName(name).split(' ');
    return `${firstName}.${lastName}`;
  };

  const onFinish = async (values: SubmitData) => {
    const { hours, position, username } = values;

    const email = generateEmail(username);

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      generatePassword(username)
    );

    setDoc(doc(firestore, 'user', user.uid), {
      hours,
      position,
      email,
    });
  };

  return (
    <Form autoComplete="off" layout="inline" onFinish={onFinish}>
      <Form.Item name="username">
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Name"
        />
      </Form.Item>

      <Form.Item name="hours" className="w-36">
        <Input
          prefix={<HourglassOutlined className="site-form-item-icon" />}
          placeholder="Stunden"
        />
      </Form.Item>

      <Form.Item name="position" className="w-36">
        <Input
          prefix={<AimOutlined className="site-form-item-icon" />}
          placeholder="Position"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Hinzufügen
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

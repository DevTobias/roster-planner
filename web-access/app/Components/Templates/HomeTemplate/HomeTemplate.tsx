import { FunctionComponent } from 'preact';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import Router from 'next/router';

import { signIn, Credentials } from '@Lib/firebaseClient';
//import { auth } from '@Lib/firebase';

const HomeTemplate: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  //const [user] = useAuthState(auth);
  /**
   * Sign in the user with the provided credentials. Redirect the user
   * to the employees page, if sign in was successful.
   *
   * @param credentials The credentials of the user.
   */
  const onSubmit = async (credentials: Credentials) => {
    setLoading(true);
    await signIn(credentials, '/employees');
    setLoading(false);
  };

  // If the user is signed in, redirect him to the employee page
  /*if (user) {
    Router.push('/employees');
  }*/

  return (
    <main>
      <h2 className="text-neutral-800 font-semibold text-header3m">Login</h2>

      <Form name="normal_login" onFinish={onSubmit}>
        <Form.Item name="username">
          <Input
            className="rounded-lg"
            prefix={<UserOutlined className="mr-2" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password
            prefix={<LockOutlined className="mr-2" />}
            type="password"
            placeholder="Passwort"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Einloggen
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default HomeTemplate;

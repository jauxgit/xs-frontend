import '@umijs/max';
import {Button, Card, Form} from 'antd';
import React from 'react';
import TextArea from "antd/es/input/TextArea";
import styles from "../index.less"

export type Props = {
  onFinish: (values: API.InterfaceInfo) => Promise<void>;

};
const OnlinTestComponent: React.FC<Props> = (props) => {
  const { onFinish } = props;

  return (
    <div >
      <span className={styles.codeshow}>请求参数</span>
      <Form name="invoke" layout="vertical" onFinish={onFinish}>
        <Form.Item name="userRequestParams">
          <TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            调用
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default OnlinTestComponent;

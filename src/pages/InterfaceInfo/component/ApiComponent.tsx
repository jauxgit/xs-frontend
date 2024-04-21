import '@umijs/max';

import React from 'react';
import {Empty, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import styles from "../index.less"

export type Props = {
  values?: API.InterfaceInfo;
};

export type InterfaceProp = {
  ContentType?: string
  name?: string,
  type?: string
}
const ApiAComponent: React.FC<Props> = (props) => {
  const { values } = props;

  const requestColumns: ColumnsType<InterfaceProp> = [
    {
      title: '请求头',
      dataIndex: 'ContentType',
      width: '100px',
    },
    {
      title: '参数',
      dataIndex: 'name',
      width: '100px',
    },

    {
      title: '类型',
      dataIndex: 'type',
      width: '100px',
    },
  ];

  const responseColumns: ColumnsType<InterfaceProp> = [
    {
      title: '请求头',
      dataIndex: 'ContentType',
      width: '100px',
    },
  ];

  const parseRequest = values ? JSON.parse((values?.requestParams) as string) : [];
  const parseResponse = values ? JSON.parse((values?.responseHeader) as string) : [];
  const parseRequestHeader = values ? JSON.parse((values?.requestHeader) as string) : [];
  const requestData: InterfaceProp[] = [
    {
      ContentType: parseRequestHeader.ContentType,
      name: parseRequest.name,
      type: parseRequest.type,
    },
  ];
  const responseData: InterfaceProp[] = [
    {
      ContentType: parseResponse.ContentType,
    },
  ];
  return (
    <div>
      {values ? (
        <div >
          <span className={styles.codeshow}>请求参数说明</span>
          <Table
            style={{ width: '50%' }}
            pagination={{
              hideOnSinglePage: true,
            }}
            columns={requestColumns}
            dataSource={requestData}
          />
          <br/>
          <span className={styles.codeshow}>响应参数说明</span>
          <Table
            style={{ width: '50%' }}
            pagination={{
              hideOnSinglePage: true,
            }}
            columns={responseColumns}
            dataSource={responseData}
          />
        </div>

      ) : (
        <Empty description={'暂无信息'} />
      )}
    </div>
  );
};
export default ApiAComponent;

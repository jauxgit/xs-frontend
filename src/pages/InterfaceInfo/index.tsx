import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/xsapi-backend/interfaceInfoController';

import CodeHighlighting from '@/components/CodeHighLighting';
import { InterfaceRequestMethodEnum, statusEnum } from '@/enum/commonEnum';
import ApiAComponent from '@/pages/InterfaceInfo/component/ApiComponent';
import OnlinTestComponent from '@/pages/InterfaceInfo/component/OnlinTestComponent';
import { PageContainer } from '@ant-design/pro-components';
import { Badge, Card, Descriptions, Empty, message, Tabs, TabsProps, Tag } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from "./index.less"
import DevelopAPITool from "@/components/DevelopAPITool";

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const params = useParams();

  const onChange = (key: string) => {
    console.log(key);
  };

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      setTimeout(() => {
      }, 100);
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (err: any) {
      message.error('请求失败', err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setInvokeRes(JSON.stringify(res, null, 4));
      message.success('请求成功');
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  const items: TabsProps['items'] = [
    {
      key: 'api',
      label: 'API请求',
      children: <ApiAComponent values={data} />,
    },
    {
      key: 'test',
      label: '在线测试',
      children: (
        <>
          <OnlinTestComponent
            onFinish={async (values) => {
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              await onFinish(values);
            }}
          />
          <br />
          <div>
            <span className={styles.codeshow}>返回结果</span>
            <Card loading={invokeLoading}>
              {invokeRes ? (
                <CodeHighlighting codeString={invokeRes} language="" />
              ) : (
                <Empty description={'未发起调用，暂无请求信息'} />
              )}
            </Card>
          </div>
        </>
      ),
    },
    {
      key: 'tools',
      label: 'API工具',
      children: <DevelopAPITool name="工具" link="https://www.jauxgit.top"/>,
    },
  ];

  return (
    <PageContainer title="查看接口文档">
      <Card title={data?.name} loading={loading}>
        {data ? (
          <Descriptions>
            <Descriptions.Item label="请求地址">
              <Paragraph copyable>{data?.url}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="接口状态">
              {data && data.status === 0 ? (
                <Badge status="default" text={statusEnum[data.status]} />
              ) : null}
              {data && data.status === 1 ? (
                <Badge status="processing" text={statusEnum[data.status]} />
              ) : null}
            </Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求方法">
              <Tag color={InterfaceRequestMethodEnum[data?.method ?? 'default']}>
                {data?.method}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <br />
      <Card>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Card>
      <br />
    </PageContainer>
  );
};

export default Index;

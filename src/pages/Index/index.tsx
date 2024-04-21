import {InterfaceRequestMethodEnum, statusEnum} from '@/enum/commonEnum';
import {
  listInterfaceInfoByPageUsingGET,
  listInterfaceInfoUsingGET,
} from '@/services/xsapi-backend/interfaceInfoController';
import { EyeOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import {Badge, Button, Descriptions, List, message, Tag} from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { values } from 'lodash';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  const onSearch: SearchProps['onSearch'] = async (value) => {
    setLoading(true);
    try {
      if (value === "") {
        const res = await listInterfaceInfoUsingGET({});
        setList(res?.data ?? []);
      } else {
        const res = await listInterfaceInfoUsingGET({
          name: value,
        });
        setList(res?.data ?? []);
      }
    } catch (err: any) {
      message.error('请求失败', err.message);
    }
    setLoading(false);
  };
  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGET({
        ...values,
      });
      console.log(res);
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (err: any) {
      message.error('请求失败', err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title="在线接口中心">
      <Search
        placeholder="输入接口名字"
        onSearch={onSearch}
        style={{ width: '30%', marginBottom: 35 }}
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return (
            <ProCard
              title={item.name}
              extra={
                <Button>
                  <a key={item.id} href={apiLink}>
                    <EyeOutlined />
                  </a>
                  ,
                </Button>
              }
              tooltip={item.description}
              style={{
                width: '90%',
                marginBottom: 45,
              }}
              boxShadow
            >
              <Descriptions column={1}>
                <Descriptions.Item label="接口状态">
                  {item && item.status === 0 ? (
                    <Badge status="default" text={statusEnum[item.status]} />
                  ) : null}
                  {item && item.status === 1 ? (
                    <Badge status="processing" text={statusEnum[item.status]} />
                  ) : null}
                </Descriptions.Item>
                <Descriptions.Item label="请求方法">
                  <Tag color={InterfaceRequestMethodEnum[item?.method ?? 'default']}>
                    {item?.method}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="描述">{item.description}</Descriptions.Item>
              </Descriptions>
            </ProCard>
          );
        }}
        pagination={{
          showTotal(total: number) {
            return '总数' + total;
          },
          pageSize: 5,
          total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;

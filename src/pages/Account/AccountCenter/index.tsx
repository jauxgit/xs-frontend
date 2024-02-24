import AccountUpdateModal from '@/pages/Account/AccountCenter/components/AccountUpdateModal';
import { ActionType, PageContainer, ProColumns } from '@ant-design/pro-components';
import { Button, Card, Descriptions, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  getAkAndSkUsingGET,
  getLoginUserUsingGET,
  updateUserAkAndSkUsingPOST,
  updateUserUsingPOST
} from "@/services/xsapi-backend/userController";

/**
 * 个人中心
 * @constructor
 */
const Index: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserUpdateRequest>();
  const [data, setData] = useState<API.UserUpdateRequest>();
  const [aksk, setAkSk] = useState<API.UserAKVo>();
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getLoginUserUsingGET();
      const aksk = await getAkAndSkUsingGET();
      console.log(aksk)
      setData(res.data);
      setAkSk(aksk.data);
    } catch (err: any) {
      message.error('请求失败', err.message);
    }
    setLoading(false);
  };


  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const userUpdate = async (fields: API.UserUpdateRequest) => {
    if (!currentRow) {
      return ;
    }
    const hide = message.loading('修改中');
    try {
      await updateUserUsingPOST({
        id: currentRow.id,
        ...fields
      });
      hide();
      message.success('修改成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('修改失败，' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新ak/sk
   *
   * @param fields
   */
  const userUpdateAkAndSk = async (fields: API.updateUserAkAndSkUsingPOSTParams) => {
    const hide = message.loading('更新中');
    try {
      await updateUserAkAndSkUsingPOST({
        ...fields
      });
      hide();
      message.success('更新成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('更新失败，' + error.message);
      return false;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: ProColumns<API.UserUpdateRequest>[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'text',
    },
  ];

  return (
    <PageContainer title="个人中心">
      <Card loading={loading}>
        {data ? (
          <Descriptions
            title="个人信息"
            column={1}
            extra={
              <Button
                onClick={() => {
                  handleUpdateModalOpen(true);
                  setCurrentRow(data);
                }}
              >
                编辑信息
              </Button>
            }
          >
            <Descriptions.Item label="用户名">{data.userName}</Descriptions.Item>
            <Descriptions.Item label="性别">{data.gender === 1 ? '男' : '女'}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>信息有误</>
        )}
      </Card>
      <br/>
      <Card loading={loading}>
        {aksk ? (
          <Descriptions
            title="AK/Sk"
            column={1}
            extra={
              <Button
                onClick={async () => {
                  await userUpdateAkAndSk({
                    id: aksk.id
                  })
                }}
              >
                更新
              </Button>
            }
          >
            <Descriptions.Item label="accessKey">{aksk.accessKey}</Descriptions.Item>
            <Descriptions.Item label="secretKey">{aksk.secretKey}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>账户不存在</>
        )}
      </Card>
      <AccountUpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await userUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default Index;

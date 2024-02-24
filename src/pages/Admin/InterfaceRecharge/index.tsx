import {
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';

import { getLoginUserUsingGET } from '@/services/xsapi-backend/userController';
import { Button, Card, Divider, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {addInterfaceInfoUsingPOST} from "@/services/xsapi-backend/interfaceInfoController";
import {addUserInterfaceInfoUsingPOST} from "@/services/xsapi-backend/userInterfaceInfoController";
import {useParams} from "react-router";

export type step1Item = {
  name?: string;
  userAccount?: string;
  totalNum?: number;
};

const StepForm: React.FC = () => {
  const [step1Data, setStep1Data] = useState<step1Item>({});
  const [data, setData] = useState<API.UserVO>();
  const params = useParams();

  const loadData = async () => {
    try {
      const res = await getLoginUserUsingGET();
      setData(res.data);
    } catch (err: any) {
      message.error('请求失败', err.message);
    }
  };

  const addInterfaceNum = async (fields: API.UserInterfaceInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addUserInterfaceInfoUsingPOST({

        ...fields,
      });
      hide();
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  const realPassword = async () => {
    try {
      const res = await getLoginUserUsingGET();
      setData(res.data);
    } catch (err: any) {
      message.error('请求失败', err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer>
      <StepsForm
        onFinish={(val) => {
          addInterfaceNum(val)
          message.success('提交成功');
          //如果有返回值为true,点击最后一步的提交按钮之后，则返回至第一步
          return true;
        }}
        submitter={{
          render: (props) => {
            console.log('props:', props);

            if (props.step === 0) {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    props.onSubmit?.();
                  }}
                >
                  去第二步 {'>'}
                </Button>
              );
            }

            if (props.step === 1) {
              return [
                <Button key="pre" onClick={() => props.onPre?.()}>
                  返回第一步
                </Button>,
                <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                  去第三步 {'>'}
                </Button>,
              ];
            }

            return [
              <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                {'<'} 返回第二步
              </Button>,
              <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                提交 √
              </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm
          title="创建订单"
          onFinish={(values) => {
            setStep1Data(values);
            return true;
          }}
        >
          <ProFormSelect
            label="充值接口名字"
            name="name"
            width="md"
            initialValue="1"
            options={[
              { value: '1', label: '获取输入的名字' },
              { value: '2', label: '随机图片' },
              { value: '4', label: '诗歌生成器' },
            ]}
            rules={[{ required: true }]}
          />
          <ProFormText
            name="userAccount"
            label="充值用户的账号"
            width="md"
            placeholder="请输入充值用户的账号"
            rules={[{ required: true }]}
          />
          <ProFormDigit
            name="totalNum"
            label="充值调用次数"
            initialValue={10}
            tooltip="充值次数。"
            placeholder="请输入充值次数"
            width="xs"
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm title="确认信息" >
          <Card>
            <div>接口名字：{step1Data?.name}</div>
            <div>账户：{step1Data?.userAccount}</div>
            <div>购买次数：{step1Data?.totalNum}</div>
          </Card>
          <br />
          <ProFormText.Password
            label="用户密码"
            name="userPassword"
            tooltip="用户密码"
            placeholder="请输入用户密码"
            width="md"
            rules={[{ required: true }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm title="充值结果">
          <Card>
            <div>角色:{data?.userRole === 'admin' ? '管理员' : '普通用户'}</div>
            <div>用户:{data?.userName}</div>
            <Divider />
            <div>接口名字：{step1Data?.name}</div>
            <div>账户：{step1Data?.userAccount}</div>
            <div>购买次数：{step1Data?.totalNum}</div>
          </Card>
          <br />
        </StepsForm.StepForm>
      </StepsForm>
    </PageContainer>
  );
};

export default StepForm;

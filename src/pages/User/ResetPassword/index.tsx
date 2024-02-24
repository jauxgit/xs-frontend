import { PageContainer, ProFormText, StepsForm } from '@ant-design/pro-components';

import {
  listUserUsingGET,
  userResetPasswordUsingPOST,
} from '@/services/xsapi-backend/userController';
import { history } from '@@/core/history';
import {Button, Card, Divider, message} from 'antd';

const StepForm = () => {
  const userData = async (val: any) => {
    try {
      const res = await listUserUsingGET({
        userAccount: val.userAccount,
      });
      if (Array.isArray(res.data) && res.data.length !== 0) {
        return true;
      } else {
        message.error('不存在该用户');
        return false;
      }
    } catch (err: any) {
      message.error('请求失败', err.message);
    }
  };

  const validatorPassword = (val: any) => {
    if (val.newPassword === val.checkPassword) {
      console.log('看看实力');
      return true;
    } else {
      message.error('新密码与确认密码不一致');
      return false;
    }
  };

  const userSubmitData = async (val: API.UserResetPasswordRequest) => {
    try {
      await userResetPasswordUsingPOST({
        ...val,
      });
      message.success('修改成功');
      /** 此方法会跳转到 redirect 参数所在的位置 */
      if (!history) return;
      history.push({
        pathname: '/user/login',
      });
      return true;
    } catch (err: any) {
      message.error(err.message);
      return false;
    }
  };

  return (
    <PageContainer>
      <StepsForm
        onFinish={async (val: API.UserResetPasswordRequest) => {
          return await userSubmitData(val);
          //如果有返回值为true,点击最后一步的提交按钮之后，则返回至第一步
        }}
        submitter={{
          render: (props) => {
            console.log('props:', props);

            if (props.step === 0) {
              return (
                <Button type="primary" onClick={() => props.onSubmit?.()}>
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
          title="验证用户"
          onFinish={(val: string) => {
            return userData(val);
          }}
        >
          <ProFormText
            name="userAccount"
            label="用户账号"
            width="md"
            placeholder="请输入用户账号"
            rules={[{ required: true }]}
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm
          title="重置密码"
          onFinish={async (val) => {
            return validatorPassword(val);
          }}
        >
          <ProFormText.Password
            label="旧密码"
            name="userPassword"
            tooltip="旧密码"
            placeholder="请输入旧密码"
            width="md"
            rules={[{ required: true }]}
          />
          <ProFormText.Password
            label="新密码"
            name="newPassword"
            tooltip="新密码"
            placeholder="请输入新密码"
            width="md"
            rules={[{ required: true }]}
          />
          <ProFormText.Password
            label="确认新密码"
            name="checkPassword"
            tooltip="确认新密码"
            placeholder="请输入确认新密码"
            width="md"
            rules={[{ required: true }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm title="提交信息">
          <Card>请检查信息后在提交</Card>
          <Divider/>
        </StepsForm.StepForm>
      </StepsForm>
    </PageContainer>
  );
};

export default StepForm;

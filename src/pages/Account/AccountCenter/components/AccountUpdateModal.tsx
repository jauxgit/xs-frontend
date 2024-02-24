import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  values: API.UserUpdateRequest;
  columns: ProColumns<API.UserUpdateRequest>[];
  onCancel: () => void;
  onSubmit: (values: API.UserUpdateRequest) => Promise<void>;
  visible: boolean;
};
const AccountUpdateModal: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;

  const formRef = useRef<any>();

  //监听数据更新当前数据
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default AccountUpdateModal;

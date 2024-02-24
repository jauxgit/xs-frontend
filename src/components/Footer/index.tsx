import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '小衫出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'plant',
          title: 'JAUX署记',
          href: 'https://www.jauxgit.top',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined/> 小衫 GitHub</>,
          href: 'https://github.com/jauxgit',
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;

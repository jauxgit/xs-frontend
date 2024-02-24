import '@umijs/max';
import React from 'react';
import styles from './index.less'

export type Props = {
  name?: string
  link?: string
};
const DevelopAPITool: React.FC<Props> = (props) => {
  const {name, link} = props
  return (
   <div>
     <span className={styles.codeshow}>{name}</span>
     <div style={{marginTop: 20}}>
       <a href={link}>下载链接</a>
     </div>
   </div>
  );
};
export default DevelopAPITool;

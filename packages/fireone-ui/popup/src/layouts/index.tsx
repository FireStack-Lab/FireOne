import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

function mapState(state: any) {
  console.log(state);
  return {};
}

export default connect(mapState)(BasicLayout);

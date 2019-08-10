import React from 'react';
import router from 'umi/router';
import styles from './index.css';
import { Button } from 'antd';
import { formatMessage } from 'umi-plugin-locale';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <div className={styles.list}>
        <Button
          // tslint:disable-next-line: jsx-no-multiline-js
          onClick={
            // tslint:disable-next-line: jsx-no-lambda
            () => router.push('./login')
          }
        />
      </div>
    </div>
  );
}

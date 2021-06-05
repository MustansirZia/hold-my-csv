import { FC, memo } from 'react';
import { Breadcrumb } from 'antd';

const Breadcrumbs: FC = () => {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default memo(Breadcrumbs);

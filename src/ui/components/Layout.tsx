import { FC, memo, ReactNode } from 'react';
import { Layout as AntLayout } from 'antd';

const { Content } = AntLayout;

type LayoutProps = {
    children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
    <AntLayout className="layout">
        <Content style={{ padding: '0 50px' }}>{children}</Content>
    </AntLayout>
);

export default memo(Layout);

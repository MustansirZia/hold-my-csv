import React, { FC, ReactNode } from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

type FooterProps = {
    children: ReactNode;
};

const Footer: FC<FooterProps> = ({ children }) => <AntFooter style={{ textAlign: 'center' }}>{children}</AntFooter>;

export default Footer;

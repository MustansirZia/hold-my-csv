import React, { FC } from 'react';
import NextHead from 'next/head';

type HeadProps = {
    title: string;
    description: string;
};

const Head: FC<HeadProps> = ({ title, description }) => {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content={description} />
        </NextHead>
    );
};

export default Head;

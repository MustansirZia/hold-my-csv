import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { FC, memo } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default memo(App);

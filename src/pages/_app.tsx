import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Header from '~/component/Header/Header';
import '~/styles/style.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import createStore from '~/ducks/CreateStore';

/**
 *
 *
 * @param {AppProps} { Component, pageProps }
 * @return {*}  {JSX.Element}
 */
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<Provider store={createStore()}>
			<Header />
			<Component {...pageProps}></Component>
		</Provider>
	);
};

export default MyApp;

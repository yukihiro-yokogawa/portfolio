import { AppProps } from 'next/dist/next-server/lib/router/router';
import Header from '~/component/Header/Header';
import '~/styles/style.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Header />
			<Component {...pageProps}></Component>
		</>
	);
};

export default MyApp;

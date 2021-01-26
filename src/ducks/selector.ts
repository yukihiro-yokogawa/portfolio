import { useSelector } from 'react-redux';
import { PortfolioState } from '~/Type/Portfolio';

export const useProjectState = (): PortfolioState => {
	return useSelector((state: { portfolio: PortfolioState }) => state.portfolio);
};

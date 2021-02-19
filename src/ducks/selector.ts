import { useSelector, shallowEqual } from 'react-redux';
import { PortFolioState } from '~/Type/PortFolio';

export const useStoreState = (): PortFolioState => {
	return useSelector((state: PortFolioState) => state, shallowEqual);
};

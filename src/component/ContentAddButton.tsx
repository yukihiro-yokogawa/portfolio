import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';

const ContentAddButton = (props: { linkHref; linkAs }): JSX.Element => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			fab: {
				position: 'absolute',
				bottom: theme.spacing(2),
				right: theme.spacing(2),
			},
		}),
	);
	return (
		<>
			<Link href={props.linkHref} as={props.linkAs}>
				<Fab aria-label="Add" className={useStyles().fab} color="primary">
					<AddIcon />
				</Fab>
			</Link>
		</>
	);
};

export default ContentAddButton;

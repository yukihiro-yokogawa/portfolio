import { Chip, createStyles, Input, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { CustomSelectFieldState } from '~/Type/Form';

/**
 * Material UiのSelect関係コンポーネントをラッピングしたカスタムコンポーネント.
 *
 * @param {CustomSelectFieldState} props
 * @return {*}  {JSX.Element}
 */
const CustomSelectField = (props: CustomSelectFieldState): JSX.Element => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			formControl: {
				margin: theme.spacing(1),
				minWidth: 120,
				maxWidth: 300,
			},
			chips: {
				display: 'flex',
				flexWrap: 'wrap',
			},
			chip: {
				margin: 2,
			},
			noLabel: {
				marginTop: theme.spacing(3),
			},
		}),
	);

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	function getStyles(name: string, personName: string[], theme: Theme) {
		return {
			fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
		};
	}

	const theme = useTheme();
	const classes = useStyles();
	const [selectedValue, setSelectedValue] = useState<string[]>([]);

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedValue(event.target.value as string[]);
		props.handleClick(event.target.value as string[]);
	};

	return (
		<>
			<div style={{ margin: 8 }}>
				<InputLabel shrink id="demo-mutiple-chip-label">
					{props.label}
				</InputLabel>
				<Select
					labelId="demo-mutiple-chip-label"
					id="demo-mutiple-chip"
					multiple
					value={selectedValue}
					onChange={handleChange}
					input={<Input id="select-multiple-chip" />}
					renderValue={(selected: Array<string>) => (
						<div className={classes.chips}>
							{selected.length == 0 ? (
								<label style={{ color: '#98A2A2' }}>選択してください</label>
							) : (
								(selected as string[]).map((value) => <Chip key={value} label={value} className={classes.chip} />)
							)}
						</div>
					)}
					displayEmpty={true}
					MenuProps={MenuProps}
				>
					{props.selectValue.map((value) => (
						<MenuItem key={value} value={value} style={getStyles(value, selectedValue, theme)}>
							{value}
						</MenuItem>
					))}
				</Select>
			</div>
		</>
	);
};

export default CustomSelectField;

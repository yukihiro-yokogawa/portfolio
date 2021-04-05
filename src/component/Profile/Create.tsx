import { Box, Button, Container, Fab } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStoreState } from '~/ducks/selector';
import { ProfileCreateState } from '~/Type/Profile';
import CustomInput from '../Form/CustomInput';
import _ from 'lodash';

const create = (props: ProfileCreateState): JSX.Element => {
	const methods = useForm();
	const profiles = useStoreState().profiles;
	const myProfiles = _.mapKeys(useStoreState().myProfiles, 'profile.id');
	const { profileFieldList, handleClickAddProfile, handleClickDeleteProfile, handleSubmit } = props;
	return (
		<Container style={{ width: '80%', marginTop: 50 }}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(handleSubmit)}>
					{profiles.map((profile, index1) => (
						<Box key={profile.name} alignItems="center" width={1}>
							<h3 className="title">{profile.name}</h3>
							<>
								{profile.dateType === true ? (
									<>
										{profileFieldList.map((item, index2) => (
											<Box
												alignItems="center"
												width={1}
												display="flex"
												flexWrap="wrap"
												style={{ justifyContent: 'space-between' }}
												key={item}
											>
												<input
													type="hidden"
													name={`profiles[${index1}].dynamic[${index2}].deleted`}
													value={'false'}
													ref={methods.register}
												/>
												<input
													type="hidden"
													name={`profiles[${index1}].dynamic[${index2}].id`}
													value={'0'}
													ref={methods.register}
												/>
												<input
													type="hidden"
													name={`profiles[${index1}].dynamic[${index2}].profile.id`}
													value={profile.id != null ? profile.id : '0'}
													ref={methods.register}
												/>
												<input
													type="hidden"
													name={`profiles[${index1}].dynamic[${index2}].profile.dateType`}
													value={`${profile.dateType}`}
													ref={methods.register}
												/>
												<input
													type="hidden"
													name={`profiles[${index1}].dynamic[${index2}].profile.displayOrder`}
													value={profile.displayOrder}
													ref={methods.register}
												/>
												<input
													type="hidden"
													name={`profiles[${index1}].dynamic[${index2}].profile.name`}
													value={profile.name}
													ref={methods.register}
												/>
												<CustomInput
													label={`${profile.name}の日付`}
													name={`profiles[${index1}].dynamic[${index2}].date`}
													required={false}
													length={0}
													url={false}
													date={true}
													value=""
													placeholder={`${profile.name}の日付を入力してください。`}
													customStyle={{ width: '30%' }}
												/>
												<CustomInput
													label={`${profile.name}のタイトル`}
													name={`profiles[${index1}].dynamic[${index2}].title`}
													required={false}
													length={64}
													url={false}
													date={false}
													value=""
													placeholder={`${profile.name}のタイトルを入力してください。`}
													customStyle={{ width: '60%' }}
												/>
												<CustomInput
													label={profile.name}
													name={`profiles[${index1}].dynamic[${index2}].description`}
													required={false}
													length={1024}
													url={false}
													date={false}
													value=""
													placeholder={`${profile.name}の概要を入力してください`}
													customStyle={{ width: '90%' }}
												/>
												<Fab
													aria-label="Delete"
													color="primary"
													size="small"
													style={{ width: '36px', height: '36px' }}
													onClick={() => {
														handleClickDeleteProfile(item, index2);
													}}
												>
													×
												</Fab>
											</Box>
										))}
									</>
								) : (
									<>
										<input
											type="hidden"
											name={`profiles[${index1}].static.deleted`}
											value={'false'}
											ref={methods.register}
										/>
										<input type="hidden" name={`profiles[${index1}].static.id`} value={'0'} ref={methods.register} />
										<input type="hidden" name={`profiles[${index1}].static.title`} value="" ref={methods.register} />
										<input type="hidden" name={`profiles[${index1}].static.date`} value="" ref={methods.register} />
										<input
											type="hidden"
											name={`profiles[${index1}].static.profile.id`}
											value={profile.id != null ? profile.id : '0'}
											ref={methods.register}
										/>
										<input
											type="hidden"
											name={`profiles[${index1}].static.profile.dateType`}
											value={`${profile.dateType}`}
											ref={methods.register}
										/>
										<input
											type="hidden"
											name={`profiles[${index1}].static.profile.displayOrder`}
											value={profile.displayOrder}
											ref={methods.register}
										/>
										<input
											type="hidden"
											name={`profiles[${index1}].static.profile.name`}
											value={profile.name}
											ref={methods.register}
										/>
										<CustomInput
											label={profile.name}
											name={`profiles[${index1}].static.description`}
											required={false}
											length={1024}
											url={false}
											date={false}
											value=""
											placeholder={`${profile.name}の概要を入力してください`}
											customStyle={null}
										/>
									</>
								)}

								{profile.dateType === true ? (
									<Button
										style={{ margin: 8 }}
										onClick={handleClickAddProfile}
										variant="contained"
										color="primary"
										size="medium"
									>
										add
									</Button>
								) : null}
							</>
						</Box>
					))}
					<Button
						type="submit"
						style={{ margin: 8 }}
						variant="contained"
						color="primary"
						size="medium"
						disabled={useStoreState().network.loading}
					>
						Submit
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};

export default create;

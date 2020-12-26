import React, { useState, useEffect } from 'react';
import { ApiClient } from 'admin-bro';
import { Button, Icon, Box, Modal, Text } from '@admin-bro/design-system';

type Props = {};

const TriggerWorkflow: React.FC<Props> = () => {
	const api = new ApiClient();
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		(document.querySelector('.admin-bro_Overlay') as HTMLElement)?.click();
	}, [isModalVisible]);

	const triggerWorkflow = async () => {
		setIsLoading(true);
		await api.getDashboard({
			method: 'POST',
		});
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			<Box flex alignItems="center" p="xxl" justifyContent="center">
				<Button
					onClick={() => {
						setIsModalVisible(true);
					}}
					variant="primary"
				>
					{isLoading && <Icon fade spin />} Trigger Workflow
				</Button>
			</Box>
			{isModalVisible && (
				<Modal
					{...{
						label: 'Are you sure to trigger the workflow',
						icon: 'Car',
						title: 'Workflow Trigger',
						variant: 'danger',
						subTitle: 'The workflow will rebuild Gatsby Webiste',
						buttons: [
							{
								label: 'Cancel',
								onClick: () => {
									setIsModalVisible(false);
								},
							},
							{ label: 'Trigger', variant: 'danger', onClick: triggerWorkflow },
						],
					}}
				/>
			)}
		</React.Fragment>
	);
};

export default TriggerWorkflow;

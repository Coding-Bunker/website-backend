import React from 'react';
import { unflatten } from 'flat';
import { ShowPropertyProps, RecordJSON } from 'admin-bro';
import { Badge, Box, FormGroup, Label } from '@admin-bro/design-system';

import { Option } from './ManyToMany.types';

const getOptionsFromRecord = (records: RecordJSON[]): Option[] =>
	records.map(r => ({
		label: r.title,
		value: r.id,
	}));

const ManyToManyShow: React.FC<ShowPropertyProps> = ({ property, record }) => {
	const recordsOfResource: RecordJSON[] =
		unflatten<any, any>(record.populated)[property.name] ?? [];
	const items = getOptionsFromRecord(recordsOfResource);

	console.log(record);
	return (
		<FormGroup>
			<Label>{property.label}</Label>
			<Box flex flexDirection="row">
				{items.map((item, index) => (
					<Badge key={index} mx="3px">
						{item.label}
					</Badge>
				))}
			</Box>
		</FormGroup>
	);
};

export default ManyToManyShow;

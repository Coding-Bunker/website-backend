import { EditPropertyProps } from 'admin-bro';
import { Box, FormGroup, FormMessage, Label } from '@admin-bro/design-system';

import React, { useMemo } from 'react';
import Editor from 'rich-markdown-editor';

const PostEdit: React.FC<EditPropertyProps> = ({ property, resource, record, onChange }) => {
	const value = record.params?.[property.name] ?? '';
	const error = record.errors && record.errors[property.name];

	return (
		<FormGroup error={Boolean(error)}>
			<Label htmlFor={property.name} required={property.isRequired}>
				{property.label}
			</Label>
			<Editor
				onChange={value => {
					console.log(value());
				}}
				value={value}
			/>
			<FormMessage>{error?.message}</FormMessage>
		</FormGroup>
	);
};

export default PostEdit;

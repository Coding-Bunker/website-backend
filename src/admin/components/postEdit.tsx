import { EditPropertyProps } from 'admin-bro';
import { Box, FormGroup, FormMessage, Label } from '@admin-bro/design-system';
import React, { useMemo, useState, useEffect } from 'react';

import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { deserialize, serialize } from 'remark-slate';

const PostEdit: React.FC<EditPropertyProps> = ({ property, resource, record, onChange }) => {
	//const value = record.params?.[property.path] ?? '';
	const error = record.errors && record.errors[property.name];

	const [value, setValue] = useState<Node[]>([]);
	const editor = useMemo(() => withReact(createEditor()), []);

	useEffect(() => {
		onChange(value.map(value => serialize(value as any)).join(' '));
	}, [value]);

	return (
		<FormGroup error={Boolean(error)}>
			<Label required={property.isRequired}>{property.label}</Label>
			<Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
				<Editable />
			</Slate>
			<FormMessage>{error?.message}</FormMessage>
		</FormGroup>
	);
};

export default PostEdit;

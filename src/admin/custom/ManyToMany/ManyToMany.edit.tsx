import React, { useState } from 'react';
import { ValueType } from 'react-select';
import Select from 'react-select/async';
import { ApiClient, EditPropertyProps, RecordJSON } from 'admin-bro';
import { FormGroup, Label } from '@admin-bro/design-system';
import { unflatten } from 'flat';

import { Option } from './ManyToMany.types';

const getOptionsFromRecord = (records: RecordJSON[]): Option[] =>
	records.map(r => ({
		label: r.title,
		value: r.id,
	}));

const getItems = (record: RecordJSON, name: string): Option[] =>
	unflatten<any, any>(record.populated)[name]
		? getOptionsFromRecord((record.populated[name] as unknown) as RecordJSON[]) // TS Forces this casts :c
		: [];

const ResourceSelection = ({ onChange, name, resourceId, selected: initialSelection }) => {
	const [selected, setSelected] = useState(initialSelection);
	const api = new ApiClient();

	const loadOptions = async inputValue => {
		const records = await api.searchRecords({
			resourceId,
			query: inputValue,
		});

		const options = getOptionsFromRecord(records);

		return options;
	};

	const handleChange = (selectedOptions: Option[]) => {
		setSelected(selectedOptions ?? []);
		onChange(
			name,
			selectedOptions?.map(opt => opt.value),
		);
	};

	return (
		<Select
			isMulti
			defaultOptions
			loadOptions={loadOptions}
			value={selected}
			onChange={handleChange as (selectedOpt: ValueType<Option>) => void}
		/>
	);
};

const ManyToManyEdit: React.FC<EditPropertyProps> = ({ onChange, property, record }) => {
	const recordsOfResource: RecordJSON[] =
		unflatten<any, any>(record.populated)[property.name] ?? [];
	const items = getOptionsFromRecord(recordsOfResource);

	const resourceId = property.custom?.resource;

	console.log(property);
	return (
		<FormGroup>
			<Label>{property.label}</Label>
			<ResourceSelection
				onChange={onChange}
				name={property.name}
				resourceId={resourceId ?? property.name}
				selected={items}
			/>
		</FormGroup>
	);
};

export default ManyToManyEdit;

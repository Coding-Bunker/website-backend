import {} from 'faker';

import { everyFieldRequiredSchema, partiallyRequiredSchema, userSchema } from '../../utils/schemas';

describe('Utils - Schemas', () => {
	let mockUser: any;
	describe('everyFieldRequiredSchema', () => {
		beforeEach(() => {
			mockUser = {
				email: 'fkfeko@fekfeko.com',
				password: 'bella password',
				role: 'member',
				firstName: 'Nome',
				lastName: 'Cognome',
			};
		});

		it('Work with every fields setted', () => {
			const schema = everyFieldRequiredSchema(userSchema);

			schema.validateSync(mockUser);
		});

		it('Crash with not every field setted', () => {
			const schema = everyFieldRequiredSchema(userSchema);

			delete mockUser.role;

			expect.assertions(1);

			try {
				schema.validateSync(mockUser);
			} catch (e) {
				expect(e.message).toEqual('Every fields is required');
			}
		});
	});

	describe('partiallyRequiredSchema', () => {
		beforeEach(() => {
			mockUser = {
				role: 'member',
			};
		});

		it('Work with one field setted', () => {
			const schema = partiallyRequiredSchema(userSchema);

			schema.validateSync(mockUser);
		});

		it('Crash with 0 fields setted', () => {
			const schema = partiallyRequiredSchema(userSchema);

			expect.assertions(1);

			try {
				schema.validateSync({});
			} catch (e) {
				expect(e.message).toEqual('At least one field is required');
			}
		});
	});
});

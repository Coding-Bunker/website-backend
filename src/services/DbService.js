class DbService {
	#connection;

	init(connection) {
		this.#connection = connection;

		Object.freeze(this);
	}

	getConnection() {
		return this.#connection;
	}
}

const instance = new DbService();

export default instance;

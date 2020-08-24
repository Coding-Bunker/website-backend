export const promisify = async (wrapFunc: (cb: () => void) => void) =>
	new Promise((res, rej) => {
		wrapFunc(res);
	});

export const UUIDRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const promisify = async (wrapFunc: (cb: () => void) => void) =>
	new Promise((res, rej) => {
		wrapFunc(res);
	});

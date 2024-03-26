import {useEffect, useState} from 'react';
export const useInput = (s: string) => {
	const [inputVal, setInputVal] = useState<string>(s ?? '');
	useEffect(() => {
		() => {
			setInputVal('');
		};
	}, []);
	return [inputVal, setInputVal] as const;
};

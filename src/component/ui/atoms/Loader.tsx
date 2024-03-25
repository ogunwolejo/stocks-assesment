import React, {memo} from 'react';

const Loader = memo(() => (
	<div className='flex h-screen items-center justify-center bg-white'>
		<div className='h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary '></div>
	</div>
));

Loader.displayName = 'Loader';

export default Loader;

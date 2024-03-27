import React, {useState} from 'react';

type AlertProps = {
	message: string;
};

const Alert: React.FC<AlertProps> = ({message}) => {
	const [isOpen, setIsOpen] = useState(true);

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div>
			{isOpen && (
				<div className='bg-red-400 p-4 rounded-md flex justify-between items-center'>
					<span className='text-red-800'>{message}</span>
					<button className='text-red-800' onClick={handleClose}>
						&times;
					</button>
				</div>
			)}
		</div>
	);
};

export default Alert;

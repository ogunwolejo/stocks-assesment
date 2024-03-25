import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from './popover';
import {Button} from './button';
import {CalendarDaysIcon} from '@heroicons/react/24/outline';
import {type FieldValues} from 'react-hook-form';
import {Calendar} from './calendar';
import {format} from 'date-fns';
import clsx from 'clsx';

type Props = {
	field?: FieldValues;
};

const Datepicker = ({field = {}}: Props) => (
	<Popover>
		<PopoverTrigger asChild>
			<Button
				variant={'outline'}
				className={clsx('justify-between text-left font-normal border-form-stroke px-3', !field.value && 'text-muted')}
			>
				{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
				<CalendarDaysIcon className='ml-2 h-4 w-4 text-muted' />
			</Button>
		</PopoverTrigger>
		<PopoverContent className='w-auto p-0' align='start'>
			<Calendar mode='single' selected={field.value} onSelect={field.onChange} initialFocus />
		</PopoverContent>
	</Popover>
);

export default Datepicker;

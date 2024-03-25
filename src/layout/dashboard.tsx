import React, {useState, memo} from 'react';
import Header from '@/component/ui/molecules/navbar';
import Sidebar from '@/component/ui/molecules/sidebar';
import {Outlet} from 'react-router-dom';

const Dashboard: React.FC = memo(() => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className='dark:bg-boxdark-2 dark:text-bodydark'>
			<div className='flex h-screen overflow-hidden'>
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<main className='bg-bodydark w-full h-full'>
						<div className='mx-auto py-4 px-4 md:p-6 2xl:p-10'>
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
});

export default Dashboard;
Dashboard.displayName = 'Dashboard';

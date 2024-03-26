/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {useEffect, useRef, useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import SidebarLinkGroup from '@/component/ui/atoms/sidebarGroups';
import {stockRoutes} from '@/routes';

type SidebarProps = {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
};

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
	const location = useLocation();
	const {pathname} = location;

	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
	);

	useEffect(() => {
		const clickHandler = ({target}: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};

		document.addEventListener('click', clickHandler);
		return () => {
			document.removeEventListener('click', clickHandler);
		};
	});

	// Close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({keyCode}: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};

		document.addEventListener('keydown', keyHandler);
		return () => {
			document.removeEventListener('keydown', keyHandler);
		};
	});

	useEffect(() => {
		localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.querySelector('body')?.classList.add('sidebar-expanded');
		} else {
			document.querySelector('body')?.classList.remove('sidebar-expanded');
		}
	}, [sidebarExpanded]);

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
				<button
					ref={trigger}
					onClick={() => {
						setSidebarOpen(!sidebarOpen);
					}}
					aria-controls='sidebar'
					aria-expanded={sidebarOpen}
					className='block lg:hidden'
				>
					<svg
						className='fill-current'
						width='20'
						height='18'
						viewBox='0 0 20 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
							fill=''
						/>
					</svg>
				</button>
			</div>

			<div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
				{/* <!-- Sidebar Menu --> */}
				<nav className='mt-5 py-4 px-4 lg:mt-9 lg:px-6'>
					<div>
						<ul className='mb-6 flex flex-col gap-1.5'>
							{/* <!-- Menu Item Dashboard --> */}
							<SidebarLinkGroup activeCondition={pathname === '/' || pathname.includes('dashboard')}>
								{(handleClick, open) => (
									<React.Fragment>
										<NavLink
											to='#'
											className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												(pathname === '/' || pathname.includes('dashboard')) && 'bg-graydark dark:bg-meta-4'
											}`}
											onClick={(e) => {
												e.preventDefault();
												sidebarExpanded ? handleClick() : setSidebarExpanded(true);
											}}
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='currentColor'
												className='w-6 h-6'
											>
												<path d='M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z' />
											</svg>
											Stock
											<svg
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
												width='20'
												height='20'
												viewBox='0 0 20 20'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z'
													fill=''
												/>
											</svg>
										</NavLink>
										{/* <!-- Dropdown Menu Start --> */}
										<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
											<ul className='mt-4 mb-5.5 flex flex-col gap-2.5 pl-6'>
												{stockRoutes.map((route, idx: number) => (
													<li key={idx}>
														<NavLink
															to={route.path}
															className={({isActive}) =>
																'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
																(isActive && '!text-white')
															}
														>
															<div className='capitalize'>{route.title}</div>
														</NavLink>
													</li>
												))}
											</ul>
										</div>
										{/* <!-- Dropdown Menu End --> */}
									</React.Fragment>
								)}
							</SidebarLinkGroup>

							{/* - secondaryRoutes.map((routes, idx: number) => (
								<li key={idx}>
									<NavLink
										to={routes.path}
										className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
											pathname.includes(routes.path) && 'bg-graydark dark:bg-meta-4'
										}`}
									>
										{routes.svg}
										<div className='capitalize'>{routes.title}</div>
									</NavLink>
								</li>
							)) */}
						</ul>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;

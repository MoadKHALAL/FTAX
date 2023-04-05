import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	Stack,
	Toolbar,
	Typography,
	Menu,
	MenuItem,
	Button,
	Divider,
	ListItemIcon,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useSelector } from '@xstate/react';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppStateContext } from '../context/AppStateProvider';
import { useCustomCompare } from '../utils';

const AppNavbar = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const { user, isLoading } = useSelector(
		rootService,
		(state) => {
			return {
				user: state.context.user,
				isLoading:
					state.matches('loading') ||
					state.matches('logging_in') ||
					state.matches('register'),
			};
		},
		useCustomCompare
	);
	const navigate = useNavigate();

	const [anchorElUser, setAnchorElUser] = useState(null);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const stringToName = (name) => {
		return {
			children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
		};
	};

	return (
		<Box>
			<AppBar position="static" sx={{ px: 5 }}>
				<Toolbar>
					<Stack
						justifyContent={'space-between'}
						alignItems={'center'}
						direction={'row'}
						sx={{ width: '100%' }}>
						<Stack direction={'row'} spacing={5} alignItems={'end'}>
							<Box>
								<Typography
									variant="h4"
									component={'span'}
									sx={{ fontWeight: 'bolder', letterSpacing: 2 }}>
									F
								</Typography>
								<Typography
									variant="h4"
									component={'span'}
									color="secondary"
									sx={{ fontWeight: 'bolder', letterSpacing: 2 }}>
									TAX
								</Typography>
							</Box>
							<Button
								component={Link}
								to="records"
								size="medium"
								sx={{
									color: 'white',
									fontSize: '1rem',
									'&:hover': {
										borderBottom: '2px solid',
										borderColor: 'secondary.main',
										borderRadius: 0,
									},
								}}>
								Home
							</Button>
						</Stack>
						<Stack direction={'row-reverse'}>
							{!isLoading ? (
								<Box>
									<IconButton onClick={handleOpenUserMenu}>
										<Avatar
											{...stringToName(`${user.first_name} ${user.last_name}`)}
											variant="rounded"
											sx={{
												bgcolor: 'secondary.main',
												width: 45,
												height: 45,
											}}
										/>
									</IconButton>
									<Menu
										sx={{ mt: '45px', px: '200px' }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
										onClick={handleCloseUserMenu}
										PaperProps={{
											elevation: 0,
											sx: {
												overflow: 'visible',
												filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
												mt: 1.5,
												'& .MuiAvatar-root': {
													width: 32,
													height: 32,
													ml: -0.5,
													mr: 1,
												},
												'&:before': {
													content: '""',
													display: 'block',
													position: 'absolute',
													top: 0,
													right: 14,
													width: 10,
													height: 10,
													bgcolor: 'background.paper',
													transform: 'translateY(-50%) rotate(45deg)',
													zIndex: 0,
												},
											},
										}}>
										<MenuItem onClick={() => navigate('profile')}>
											<Avatar /> Profile
										</MenuItem>
										<Divider />
										<MenuItem
											onClick={() => {
												handleCloseUserMenu();
												send('LOG_OUT', { callback: () => navigate('/login') });
											}}>
											<ListItemIcon>
												<Logout fontSize="small" />
											</ListItemIcon>
											Logout
										</MenuItem>
									</Menu>
								</Box>
							) : (
								''
							)}
						</Stack>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default AppNavbar;

import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  AccountCircle as AccountCircle,
  Create as CreateIcon,
} from '@mui/icons-material'

import AppBar from './components/AppBar'
import Drawer from './components/Drawer'
import DrawerHeader from './components/DrawerHeader'
import API from '@/global/api'
import { useMutation } from 'react-query'
import { useUserInfo } from '@/global/hook'
import DrawerItem from './components/DrawerItem'

const menuId = 'primary-search-account-menu'

interface PageLayoutProps {
  children: JSX.Element
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const { remove } = useUserInfo()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const isMenuOpen = Boolean(anchorEl)
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const { mutate: callLogout } = useMutation(() => API.post('/auth/logout'), {
    onSuccess: () => {
      remove()
      navigate('/auth/login')
    },
  })

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          callLogout()
          setAnchorEl(null)
        }}
      >
        로그아웃
      </MenuItem>
    </Menu>
  )

  return (
    <Box className="h-full" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            className="!font-semibold grow cursor-pointer"
            onClick={() => navigate('/')}
          >
            Dev Wiki
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              className="border border-black border-opacity-[0.12]"
            >
              <AccountCircle />
            </IconButton>

            {renderMenu}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          <DrawerItem text="아티클 쓰기" link="/article/write">
            <CreateIcon />
          </DrawerItem>

          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" className="!p-0" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default PageLayout

import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
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
  AccountCircle as AccountCircle,
  Create as CreateIcon,
  ViewList as ViewListIcon,
  Style as StyleIcon,
  ViewKanban as ViewKanbanIcon,
} from '@mui/icons-material'

import AppBar from './components/AppBar'
import Drawer from './components/Drawer'
import DrawerHeader from './components/DrawerHeader'
import API from '@/global/api'
import { useMutation } from 'react-query'
import { useUserInfo } from '@/global/api/hook'
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
            className="!font-semibold cursor-pointer !mr-auto"
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
          <DrawerItem text="아티클 쓰기" link="/article/write" open={open}>
            <CreateIcon color="primary" />
          </DrawerItem>

          <DrawerItem text="아티클 리스트" link="/article" open={open}>
            <StyleIcon color="primary" />
          </DrawerItem>
        </List>

        <Divider />

        <List>
          <DrawerItem text="태스크 리스트" link="/task/list" open={open}>
            <ViewListIcon color="primary" />
          </DrawerItem>

          {/* <DrawerItem text="태스크 칸반" link="/task/kanban" open={open}>
            <ViewKanbanIcon color="primary" />
          </DrawerItem> */}
        </List>
      </Drawer>

      <Box component="main" className="!p-0 bg-background min-h-screen" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default PageLayout

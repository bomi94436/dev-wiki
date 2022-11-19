import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface DrawerItemProps {
  text: string
  children: JSX.Element
  link: string
  open: boolean
}

const DrawerItem: React.FC<DrawerItemProps> = ({ text, children, link, open }) => {
  const navigate = useNavigate()

  return (
    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate(link)}>
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
          {children}
        </ListItemIcon>

        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  )
}

export default DrawerItem

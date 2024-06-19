import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const DrawerList = () => {
    const navigate = useNavigate()
    const natigateToCategoryPage = () => {
        navigate('/categories')

    }
    const navigateToProductsPage = () => {
        navigate('/products')
    }
    return (
        <>
            <Box sx={{ width: 250 }} role="presentation" onClick={() => { }}>
                <List>

                    <ListItem key="there" disablePadding>
                        <ListItemButton onClick={natigateToCategoryPage}>
                            <ListItemIcon >
                                {<CategoryIcon />}
                            </ListItemIcon>
                            <ListItemText primary="Category" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key="there" disablePadding>
                        <ListItemButton onClick={navigateToProductsPage}>
                            <ListItemIcon >
                                {<CategoryIcon />}
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItemButton>

                    </ListItem>


                </List>
                <Divider />
                {/* <List>

                    <ListItem key="hkhkh">
                        <ListItemButton>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="threr" />
                        </ListItemButton>
                    </ListItem>

                </List> */}
            </Box>
        </>
    )
}

export default DrawerList


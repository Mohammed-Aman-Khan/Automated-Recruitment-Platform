import { Fragment, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { resetAuth } from '../redux/AuthSlice'

const drawerWidth = 350

const Main = styled( 'main', { shouldForwardProp: ( prop ) => prop !== 'open' } )<{
    open?: boolean
}>( ( { theme, open } ) => ( {
    flexGrow: 1,
    padding: theme.spacing( 3 ),
    transition: theme.transitions.create( 'margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    marginLeft: `-${ drawerWidth }px`,
    ...( open && {
        transition: theme.transitions.create( 'margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        } ),
        marginLeft: 0,
    } ),
} ) )

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled( MuiAppBar, {
    shouldForwardProp: ( prop ) => prop !== 'open',
} )<AppBarProps>( ( { theme, open } ) => ( {
    transition: theme.transitions.create( [ 'margin', 'width' ], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    ...( open && {
        width: `calc(100% - ${ drawerWidth }px)`,
        marginLeft: `${ drawerWidth }px`,
        transition: theme.transitions.create( [ 'margin', 'width' ], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        } ),
    } ),
} ) )

const DrawerHeader = styled( 'div' )( ( { theme } ) => ( {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing( 0, 1 ),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
} ) )

export default function PersistentDrawerLeft ( { children } ) {

    const router = useRouter()
    const theme = useTheme()
    const dispatch = useDispatch()
    const [ open, setOpen ] = useState( false )

    const handleDrawerOpen = () => {
        setOpen( true )
    }

    const handleDrawerClose = () => {
        setOpen( false )
    }

    const logout = () => {
        dispatch( resetAuth() )
        router.replace( '/' )
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...( open && { display: 'none' } ) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Joboryx
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        'Company Profile',
                        'Jobs',
                        'Interview Setup',
                    ].map( ( text, index ) => <Fragment key={text}>
                        <ListItem button>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        <Divider />
                    </Fragment>
                    )}
                    <br />
                    <Button onClick={logout} size="large" fullWidth>
                        Logout
                    </Button>
                </List>
            </Drawer>
            <Main open={open}>
                {children}
            </Main>
        </Box>
    )
}
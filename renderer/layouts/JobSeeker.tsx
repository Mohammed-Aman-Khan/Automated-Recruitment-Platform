import { Fragment, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../hooks/util/redux'
import { resetAuth } from '../redux/AuthSlice'
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
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import useRequests from '../hooks/JobSeeker/useRequests'

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
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
} ) )

export default function PersistentDrawerLeft ( { children } ) {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const { getJobs } = useRequests()
    const [ open, setOpen ] = useState( false )

    const handleDrawerOpen = () => {
        setOpen( true )
    }

    const handleDrawerClose = () => {
        setOpen( false )
    }

    const logout = () => {
        dispatch( resetAuth( {} ) )
        router.replace( '/' )
    }

    useEffect( () => {
        getJobs()
    }, [] )

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
                    {
                        [
                            {
                                title: 'Profile',
                                link: '/jobseeker',
                            },
                            {
                                title: 'Job Search',
                                link: '/jobseeker/job-search',
                            },
                            {
                                title: 'Applications',
                                link: '/jobseeker/applications',
                            },
                        ]
                            .map( ( { title, link }, index ) =>
                                <Fragment key={title}>
                                    <Link href={link} passHref>
                                        <ListItem button>
                                            <ListItemText primary={title} />
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                </Fragment>
                            )
                    }
                    <br />
                    <Button onClick={logout} size="large" fullWidth>
                        Logout
                    </Button>
                </List>
            </Drawer>
            <Main open={open}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Toolbar />
                    </Grid>
                    {children}
                </Grid>
            </Main>
        </Box>
    )
}
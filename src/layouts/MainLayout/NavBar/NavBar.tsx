import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Drawer } from '@mui/material';
import { navBarCommon } from '../../../routes/navBarCommon';
import { Link } from 'react-router-dom';
import { IChildNavBar, INavBarCommon } from '../../../models/INavBar';

let stateNav = navBarCommon.map((item) => ({
    [item.title]: item.items ? !item.items : undefined
}));

type IProps = {
    isDrawer: boolean;
};

export default function NavBar({ isDrawer }: IProps) {
    const [stateNavBar, setStateNavBar] = React.useState(stateNav);

    const handleClick = (e: any) => {
        const title = e.target.innerHTML;
        let index = stateNav.findIndex((item) =>
            item.hasOwnProperty(e.target.innerHTML)
        );
        const stateNavBarNew = [
            ...stateNavBar.slice(0, index),
            {
                ...stateNavBar[index],
                [title]: !stateNavBar[index][title]
            },
            ...stateNavBar.slice(index + 1)
        ];
        setStateNavBar(stateNavBarNew);
    };

    return (
        <Drawer
            variant='persistent'
            anchor='left'
            open={isDrawer}
            sx={{
                width: `${
                    isDrawer ? `${process.env.REACT_APP_DRAWER_WIDTH}px` : '0'
                }`,
                height: '100vh'
            }}
        >
            <List
                sx={{
                    bgcolor: `${process.env.REACT_APP_THEME_COLOR}`,
                    color: 'white',
                    height: '100vh'
                }}
                component='nav'
                aria-labelledby='nested-list-subheader'
                subheader={
                    <ListSubheader
                        component='div'
                        id='nested-list-subheader'
                        sx={{
                            bgcolor: `${process.env.REACT_APP_THEME_COLOR}`,
                            color: 'white'
                        }}
                    >
                        Nguyễn Văn Nhiệm
                    </ListSubheader>
                }
            >
                {navBarCommon.map((navItem: INavBarCommon, index: number) => {
                    const Icon: any = navItem.icon;
                    return navItem.items ? (
                        <div key={index}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText
                                    onClick={handleClick}
                                    primary={navItem.title}
                                />
                                {!stateNavBar[index][navItem.title] ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ExpandMore />
                                )}
                            </ListItemButton>

                            <Collapse
                                in={stateNavBar[index][navItem.title]}
                                timeout='auto'
                                unmountOnExit
                            >
                                <List component='div' disablePadding>
                                    {navItem.items.map(
                                        (
                                            subNav: IChildNavBar,
                                            index: number
                                        ) => {
                                            const Icon: any = subNav.icon;
                                            return (
                                                <Link
                                                    to={subNav.href}
                                                    key={`subNav ${index}`}
                                                    style={{
                                                        color: 'white',
                                                        textDecoration: 'none'
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ pl: 4 }}
                                                    >
                                                        <ListItemIcon>
                                                            <Icon
                                                                sx={{
                                                                    color: 'white'
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                subNav.title
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </Link>
                                            );
                                        }
                                    )}
                                </List>
                            </Collapse>
                        </div>
                    ) : (
                        <Link
                            to={navItem.href}
                            style={{ color: 'white', textDecoration: 'none' }}
                            key={index}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary={navItem.title} />
                            </ListItemButton>
                        </Link>
                    );
                })}
            </List>
        </Drawer>
    );
}

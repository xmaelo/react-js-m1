import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  TextField,
  List, 
  Typography,
  ListItem
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import { bounceInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import NavItem from './NavItem';
import { auth } from '../pages/firebase';

const styles = {
  bounceInUp: {
    animation: 'x 2s',
    animationName: Radium.keyframes(bounceInUp, 'bounce')
  }
};


const user = {
  //avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Ismael foletia',
  email: "ismae@hgn.com"
};

const items = [
  {
    href: '/',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/patients',
    icon: UsersIcon,
    title: 'Patients'
  },
  {
    href: '/medecins',
    icon: UsersIcon,
    title: 'Medecins'
  },
  // {
  //   href: 'products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  {
    href: 'configuration',
    icon: SettingsIcon,
    title: 'Configuration'
  },
  // {
  //   href: 'account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: 'settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [showForm, setShowform] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({});

  function onAddAdmin(){
    setShowform(!showForm);
  }
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  async function onSaveAdmin(){
    setError(false);
    if(!values.password || !values.email){
      setError(true);
      return;
    }
    const r = await fetch('http://localhost:3002/create-admin', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(values)
      });
    console.log('after run', r);
    setShowform(false);
  }
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
        >
          {getInitials(auth.currentUser?.email)}
        </Avatar>
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {auth.currentUser?.email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <ListItem
            disableGutters
            sx={{
              display: 'flex',
              py: 0
            }}
          >
            <Button
              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                color: 'primary.main'
              }}
              onClick={()=>onAddAdmin()}
            >
                <ArrowUpwardIcon size="20" />
              <span>
                {"AJouter un admin"}
              </span>
            </Button>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {showForm &&
        <StyleRoot>
          <div style={styles.bounceInUp}>
            <Box
              sx={{
                backgroundColor: 'background.default',
                m: 2,
                p: 2
              }}
            >
              <Typography
                align="center"
                gutterBottom
                variant="h4" 
              >
                AJout d'un admin
              </Typography>
              <Box
                sx={{
                  //display: 'flex',
                  justifyContent: 'center',
                  pt: 2
                }}
              > 
               {error&&<p style={{color: 'red'}}>Vous n'avez pas remplir tout les champ</p>}
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    //onBlur={handleBlur}
                    onChange={(e)=>setValues({...values, email: e.target.value})}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    helperText="Au moins 6 deigits"
                    //onBlur={handleBlur}
                    onChange={(e)=>setValues({...values, password: e.target.value})}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                <Button
                  color="primary"
                  onClick={()=>onSaveAdmin()}
                  variant="contained"
                >
                  Sauvegarder
                </Button>
              </Box>
            </Box>
          </div>
        </StyleRoot>
      }
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;

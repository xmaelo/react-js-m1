import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { bounceInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Grid from '@material-ui/core/Grid';
import { auth, database } from '../../pages/firebase';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  CardHeader
} from '@material-ui/core';

const styles = {
  bounceInUp: {
    animation: 'x 5s',
    animationName: Radium.keyframes(bounceInUp, 'bounce')
  }
};

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});


const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];
const states2 = [
  {
    value: 'F',
    label: 'Femme'
  },
  {
    value: 'H',
    label: 'Homme'
  }
];

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Informations de Base', 'Informations détaillées', 'Informations sécondaire'];
}

const user = {
  profile: '/static/images/avatar.jpg',
  city: '',
  state: '',
  nom_complet: '',
  email: '',
  phone: "",
  poids: "",
  taille: "",
  password: "",
  sexe: "",
  firstName: "",
  lastName: "",
  date: null,

};
function getStepContent(step) {
  switch (step) {
    case 0:
      return <p>Yesss</p>;
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers({setShowForm}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = useState(user);

  const handleChange = (event) => {
    const val = {
      ...values,
      [event.target.name]: event.target.value
    }
    console.log('values===>', val)
    setValues(val);
  };

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  async function onAuth(){
    try{
      console.log('values2 values2 ==>before ave', values)
      const res = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log('res resv res res res', res)
     const userId = res.user.uid;
     console.log('user Id', userId, res.user)
     const custs = database.ref('users/'+userId);
     let values2 =  values
     delete values2.password
     values2 = {...values2, createdAt: new Date().getTime(), nom_complet: values.lastName+ " "+values.firstName};
     custs.set({...values2});
     setShowForm(false)
     await auth.currentUser.sendEmailVerification()
    }catch(e){
      console.error('on auth error', e)
    }
  }

  return (
    <StyleRoot>
      <div className={classes.root} style={styles.bounceInUp}>
        <Card>
          <CardHeader
            //subheader="The information can be edited"
            title={
              <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            } 
          />

          <CardContent>
        
            <div>
              {false ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                      <div>
                  {activeStep === 0 &&
                        <Grid
                          container
                          spacing={3}
                        >
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              helperText="Please specify the first name"
                              label="Nom"
                              name="firstName"
                              onChange={handleChange}
                              required
                              value={values.firstName}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Prenom"
                              name="lastName"
                              onChange={handleChange}
                              required
                              value={values.lastName}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Email"
                              name="email"
                              onChange={handleChange}
                              required
                              value={values.email}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Télephone"
                              name="phone"
                              onChange={handleChange}
                              value={values.phone}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Country"
                              name="state"
                              onChange={handleChange}
                              required
                              value={values.state}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Ville"
                              name="city"
                              onChange={handleChange}
                              required
                              value={values.city}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                  }
                  {activeStep === 1 &&
                        <Grid
                          container
                          spacing={3}
                        >
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              helperText="Enter votre poids en Kg"
                              label="Poids"
                              name="poids"
                              onChange={handleChange}
                              required
                              value={values.poids}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Taille (cm)"
                              name="taille"
                              onChange={handleChange}
                              required
                              value={values.taille}
                              variant="outlined"
                            />
                          </Grid>
                          
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Sexe"
                              name="sexe"
                              onChange={handleChange}
                              required
                              select
                              SelectProps={{ native: true }}
                              value={values.sexe}
                              variant="outlined"
                            >
                              {states2.map((option) => (
                                <option
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              id="date"
                              label="Date de naissance"
                              type="date"
                              name="date"
                              defaultValue="2017-05-24"
                              onChange={handleChange}
                              value={values.date}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                  }
                  {activeStep === 2 &&
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Avatar
                            src={user.avatar}
                            sx={{
                              height: 150,
                              width: 150
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Grid
                            item
                            md={6}
                            xs={12}
                          > <br/>
                            <TextField
                              fullWidth
                              label="Mot de passe"
                              name="password"
                              onChange={handleChange}
                              required
                              value={values.password}
                              variant="outlined"
                            />
                          </Grid>
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions>
                        <Button
                          color="primary"
                          fullWidth
                          variant="text"
                        >
                          Upload picture
                        </Button>
                      </CardActions>
                    </Card>
                  }
                      <Divider />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          p: 2
                        }}
                      >
                          {activeStep !== steps.length && (
                            <div> 
                              <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                  Arrière
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    if(steps.length-1 !== activeStep){
                                      handleNext();
                                    }else{
                                      onAuth();
                                    }
                                  }}
                                  className={classes.button}
                                >
                                  {activeStep === steps.length - 1 ? 'Sauvegader' : 'Suivant'}
                                </Button>
                              </div>
                            </div>
                          )}
                      </Box>
                    </div>
                  
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </StyleRoot>
  );
}

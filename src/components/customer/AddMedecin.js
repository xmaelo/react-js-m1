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


const states = ["CARDIOLOGUE", "OPTHAMOLOGUE"];
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
  return ['Informations de Base', 'Informations détaillées', 'Authenfication'];
}

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
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
  const [values, setValues] = useState({});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    console.log('values values', values, event.target.name,  event.target.value)
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
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

  async function onPost(){
    setError(false);
    try{
      let va = {...values, nom_complet: values.lastName+" "+values.firstName, createdAt: new Date().getTime()}
        console.log('va va va', va)
        if(!va.nom_complet || !va.specialite || !va.password || !va.phone || !va.email){
          setMessage("Vous n'avez pas fourni toutes les informations réquises");
          setError(true);
          return;
        }
          const r = await fetch('http://localhost:3002/create-doctor', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(va)
          });
      if(r.ok){
        setShowForm(false)
      }else{
        setError(true)
      }
      console.log('resul fetching ==>', r)
    }catch(e){
      console.log('error fetching data', e)
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
                      {error&&
                      <p style={{color: "red"}}>
                       {message ? message :
                        "Une erreur est survenu. Probablement ce compte existe déja !"
                       }
                        <br/>
                      </p>
                      }
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
                              // helperText=""
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
                              label="Prénom"
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
                              label="Téléphone"
                              name="phone"
                              onChange={handleChange}
                              value={values.phone}
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
                              fullWidth
                              label="Spécialité"
                              name="specialite"
                              onChange={handleChange}
                              required
                              select
                              SelectProps={{ native: true }}
                              value={values.specialite}
                              variant="outlined"
                            >
                              {states.map((option) => (
                                <option
                                  key={option}
                                  value={option}
                                >
                                  {option}
                                </option>
                              ))}
                            </TextField>
                          </Grid>

                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                        
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Anciénneté"
                              name="ancien"
                              onChange={handleChange}
                              value={values.ancien}
                              variant="outlined"
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
                                        onPost();
                                      }
                                    }
                                  }
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

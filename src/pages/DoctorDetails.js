import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Card,
  Container,
  Avatar,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import AccountProfileDoctor from 'src/components/account/AccountProfileDoctor';
import { database } from './firebase';

const states = [
  {
    value: 'F',
    label: 'Femme'
  },
  {
    value: 'H',
    label: 'Homme'
  }
];
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const DoctorDetails = (props) => {
  const [values, setValues] = useState({});

  const [doctor, setDoctor] = useState([]);

  useEffect(() => { 
    (async()  =>{
       const id = String(window.location.pathname).split('/')[String(window.location.pathname).split('/').length-1];

       const custs = database.ref('users/'+id);
       custs.on('value', (snapshot) => { 
          console.log('snapshot.val() snapshot.val()', snapshot.val())
            setValues(snapshot.val());
            });
      })()
    }, []);


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Account | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid 
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfileDoctor {...values} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >

                    <form
                      autoComplete="off"
                      noValidate
                      {...props}
                    >
                      <Card>
                        <CardHeader
                          subheader={"Dr. "+values.nom_complet}
                          title="Détails"
                        />
                        <Divider />
                        <CardContent>
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
                                label="Nom "
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
                          <br/>
                          <Divider />
                          <Divider />
                          <Divider />
                          <Divider />
                          <br/>
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
                                name="state"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.sexe}
                                variant="outlined"
                              >
                                {states.map((option) => (
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
                                label="Ancienneté"
                                name="anciennete"
                                onChange={handleChange}
                                required
                                value={values.ancien}
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                          }}
                        >
                          <Button
                            color="primary"
                            variant="contained"
                          >
                            Mettre A jour
                          </Button>
                        </Box>
                      </Card>
                    </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  );
};

export default DoctorDetails;

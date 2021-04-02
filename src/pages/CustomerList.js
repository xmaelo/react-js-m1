import React, { useState, useEffect }from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { database } from './firebase';
const CustomerList = () => {
  const [patients, setPatient] = useState([]);

  useEffect(() => {
    (async()  =>{
       let custs = database.ref('users');
       custs.on('value', (snapshot) => { 
            if(snapshot.val()){
              let a = Object.entries(snapshot.val()).map(([key, value])=>{
                return {...value, userId: key};
              })

            a.sort((x, y)=> y.createdAt - x.createdAt)
            a = a.filter((a) => !a.is_doctor);
            setPatient(a);
            }
          });
      })()
    }, []);

  return(
    <>
      <Helmet>
        <title>Patients | maMED</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            <CustomerListResults customers={patients} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;

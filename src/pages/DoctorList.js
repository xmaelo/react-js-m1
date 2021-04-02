import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import DoctorListResults from 'src/components/customer/DoctorListResults';
import DoctorListToolbar from 'src/components/customer/DoctorListToolbar';
import { database } from './firebase';
import customers from 'src/__mocks__/customers';

const DoctorList = () => {
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    (async()  =>{
       const custs = database.ref('users');
       custs.on('value', (snapshot) => { 
            if(snapshot.val()){
              let a = Object.entries(snapshot.val()).map(([key, value])=>{
                return {...value, id: key};
              })

            a.sort((x, y)=> y.createdAt - x.createdAt)
            a = a.filter((x)=>x.is_doctor)
            console.log('userrr a=======>', a)
            setDoctor(a);
            }
          });
      })()
    }, []);

  return(
    <>
      <Helmet>
        <title>Doctor | maMED</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default', 
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <DoctorListToolbar />
          <Box sx={{ pt: 3 }}>
            <DoctorListResults customers={doctor} />
          </Box>
        </Container>
      </Box>
    </>
  )
};

export default DoctorList;

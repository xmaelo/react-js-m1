import React, { useState } from 'react';
import {
  Box,
  Button, 
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { bounceOutDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import AddMedecin from './AddMedecin';


const styles = {
  bounceOutDown: {
    animation: 'x 5s',
    animationName: Radium.keyframes(bounceOutDown, 'bounce')
  }
};
 
function DoctorListToolbar(props){
  const [showForm, setShowForm] = useState(false);

  return(
    <>
      { showForm&&<AddMedecin setShowForm={setShowForm} /> }
      { !showForm &&
          <Box {...props}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button>
                Pdf
              </Button>
              <Button sx={{ mx: 1 }}>
                Excel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={()=>setShowForm(true)}
              >
                Nouveau Médecin
              </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Filtrer par nom"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
      }
    </>
  )
};

export default DoctorListToolbar;

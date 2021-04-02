import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LogoConfig from 'src/components/account/LogoConfig';
import ParametresDetails from 'src/components/account/ParametresDetails';

function Parametres(props){
	return( 
		<>
		    <Helmet>
		      <title>Paramètres | maMED</title>
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
		            <LogoConfig />
		          </Grid>
		          <Grid
		            item
		            lg={8}
		            md={6}
		            xs={12}
		          >
		            <ParametresDetails />
		          </Grid>
		        </Grid>
		      </Container>
		    </Box>
		</>
	);
};

export default Parametres;

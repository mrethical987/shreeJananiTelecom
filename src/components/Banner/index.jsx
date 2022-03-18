import { Container, Typography, Button, Grid } from "@material-ui/core";
import banner from '../../assets/shopBanner.png';

import "./style.css";

const Banner = () => {
  return (
    <div className="banner">
      <img className="img"src={banner} alt="" />
      <Container>      
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Welcome to Shree Janani Telecom
            </Typography>
            <Button className="shopping-button" href="#products">
              Start Shopping...
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;

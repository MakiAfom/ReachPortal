import { Container, Divider, Grid, Typography } from "@mui/material";
import { MyLogo } from "../../utils/StyledComps";

function Footer(): JSX.Element {
  return (
    <Container sx={{ marginTop: "auto" }} maxWidth="lg">
      <Divider sx={{ mb: 4 }} />
      <Grid container columnSpacing={8} rowSpacing={4}>
        <Grid item xs={12} md={3}>
          <MyLogo>Reach</MyLogo>
        </Grid>
        {[
          ["Home", "Resources"],
          ["About Us", "FAQs"],
          ["Contact Us", "Terms of Use", "Privacy Policy"],
          ["Login", "Register"],
        ].map((el, index) => (
          <Grid key={index} item xs={6} sm={3} md={2}>
            <Grid container direction="column" rowSpacing={1}>
              {el.map((s) => (
                <Grid item key={s}>
                  <Typography
                    color="text.secondary"
                    sx={{ userSelect: "none" }}
                  >
                    {s}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mt: 4 }} />
      <Typography color="text.secondary" variant="subtitle2" sx={{ my: 2 }}>
        &copy; 2023 Reach. All rights reserved.
      </Typography>
    </Container>
  );
}

export default Footer;

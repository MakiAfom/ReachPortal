import { SyntheticEvent, cloneElement, useEffect, useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Button,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import AppDrawer from "./AppDrawer";
import { MyAppBar, MyLogo, MyToolbar } from "../../utils/StyledComps";

const MyTabs = styled(Tabs)(() => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
})) as typeof Tabs;

const MyTab = styled((props) => <Tab {...props} disableRipple />)(() => ({
  fontSize: "1.1rem",
})) as typeof Tab;

const AuthBtnsContainer = styled("div")(() => ({
  display: "flex",
  gap: "0.8rem",
}));

function ElevationScroll({ children }: { children: JSX.Element }): JSX.Element {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const MY_TABS = [
  { name: "Resources", route: "/resources" },
  { name: "About us", route: "/about" },
];

function Navbar(): JSX.Element {
  const theme = useTheme();
  const location = useLocation();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const [tabIndex, setTabIndex] = useState<boolean | number>(false);

  const handleTabChange = (_: SyntheticEvent, newVal: number) =>
    setTabIndex(newVal);

  useEffect(() => {
    const index = MY_TABS.findIndex((t) => t.route === location.pathname);
    index >= 0 ? setTabIndex(index) : setTabIndex(false);
  }, [location]);

  return (
    <>
      <ElevationScroll>
        <MyAppBar>
          <Container maxWidth="lg">
            <MyToolbar sx={{ justifyContent: "space-between" }} disableGutters>
              <MyLogo component={Link} to="/">
                Reach
              </MyLogo>
              {matchesMd && (
                <MyTabs value={tabIndex} onChange={handleTabChange}>
                  {MY_TABS.map((t) => (
                    <MyTab
                      key={t.name}
                      label={t.name}
                      component={Link}
                      to={t.route}
                    />
                  ))}
                </MyTabs>
              )}
              <AuthBtnsContainer>
                {matchesMd && (
                  <Button
                    sx={{ color: "text.secondary" }}
                    size="small"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                )}
                {matchesMd && (
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                )}
              </AuthBtnsContainer>
              {!matchesMd && <AppDrawer />}
            </MyToolbar>
          </Container>
        </MyAppBar>
      </ElevationScroll>
      <MyToolbar />
    </>
  );
}

export default Navbar;

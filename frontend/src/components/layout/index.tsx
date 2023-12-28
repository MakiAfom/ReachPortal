import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "97vh",
}));

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <MainContainer>
      <Navbar />
      {children}
      <Footer />
    </MainContainer>
  );
}

export default Layout;

import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkMode, lightMode } from "./utils/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bgMain};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;



function App() {
  const [lightModeTheme, setLightModeTheme] = useState(true);

  return (
    <ThemeProvider theme={lightModeTheme ? lightMode : darkMode}>
      <Container>
        <Router>
          <Menu
            lightModeTheme={lightModeTheme} // envio como prop a darkMoe
            setLightModeTheme={setLightModeTheme}
          />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="ramdon"/>} />
                  <Route path="trend" element={<Home type="trend" />} />
                  <Route path="subs" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;

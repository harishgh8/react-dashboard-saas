import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/Datacontext";
import FullWidthTabs from "./scenes/FixedTabs/FullWidthTabs";
import SignInPage from "./scenes/SignInPage/SignInPage";
import Bar from "./scenes/bar";
import Calendar from "./scenes/calendar/calendar";
import Contacts from "./scenes/contacts";
import FAQ from "./scenes/faq";
import Form from "./scenes/form";
import Geography from "./scenes/geography";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Invoices from "./scenes/invoices";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Team from "./scenes/team";
import { ColorModeContext, useMode } from "./theme";
import FormComponent from "./scenes/FormComponent/FormComponent";
import DataTable from "./scenes/DataTable";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <CssBaseline />
          <SignedIn>
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/" element={<FormComponent />} />
                  <Route path="/DataTable" element={<DataTable />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                </Routes>
              </main>
            </div>
          </SignedIn>
          <SignedOut>
            <SignInPage />
          </SignedOut>
        </DataProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

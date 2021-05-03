import { useState } from "react";
import "./App.css";
import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  Page,
  Card,
  Button,
  Heading,
  Checkbox,
} from "@shopify/polaris";
import Switch from "react-switch";

function App() {
  const [text, setText] = useState(
    "<iframe><img src='www.google.com'/></iframe>"
  );
  const [msg, setMsg] = useState(null);
  const [checked, setChecked] = useState(false);

  const copyHandler = () => {
    navigator.clipboard.writeText(text);
    setMsg("copied");
    setTimeout(() => {
      setMsg(null);
    }, 2000);
  };

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <AppProvider i18n={enTranslations}>
      <Page>
        <Card sectioned>
          <Card sectioned subdued>
            <Heading>Widget App</Heading>
          </Card>
          <br />
          <p>
            Show the widget in the footer of the website. View widget (
            <span style={{ color: "blue" }}>
              https://www.nikhilstore11.myshopify.com/
            </span>
            )
            <span style={{ margin: "30px 0px 0px 7px", verticalAlign: "top" }}>
              <Switch
                checked={checked}
                onChange={handleChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                height={15}
                width={35}
                className="react-switch"
                id="material-switch"
              />
            </span>
          </p>
          <br />
          <p>
            if you want to add widget anywhere in your website you copy the code
            and paste in your website to show the widget. Here is the example
            how it will show in your website.
          </p>
          <br />
          <Card sectioned subdued>
            {/* copy functionality here! */}
            <div style={{ float: "right" }}>
              <Button
                size="slim"
                onClick={copyHandler}
                primary={msg == null ? true : false}
              >
                {msg === null ? "Copy" : "Copied!"}
              </Button>
            </div>
            <br />
            <br />
            {text}
          </Card>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;

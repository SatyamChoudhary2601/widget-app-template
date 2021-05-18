import { useState, useCallback } from "react";
import "./App.css";
import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  Page,
  Card,
  EmptyState,
  Modal,
  TextContainer,
  TextField,
  Frame,
  Toast,
  Spinner,
} from "@shopify/polaris";
import Widget from "./components/Widget.js";

function App() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [showWiget, setShowWidget] = useState(null);
  const [emailList, setEmailList] = useState(["satyam@gmail.com"]);
  const [emailNotFound, setEmailNotFound] = useState([]);

  const [value, setValue] = useState("");

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  // Toast
  const [activeToast, setActiveToast] = useState(false);

  const toggleActive = () => {
    setActiveToast(!activeToast);
  };
  // const toggleActive = useCallback(
  //   () => setActiveToast((activeToast) => !activeToast),
  //   []
  // );

  const toastMarkup = activeToast ? (
    <Toast content="Account found!" onDismiss={toggleActive} />
  ) : null;

  // +++++===============
  const emailHandler = () => {
    setActive(!active);
  };
  const saveEmailHandler = () => {
    setValue(value);
    setEmailList([value, ...emailList]);
    emailHandler();
    setValue("");
    setEmailNotFound([value]);
    console.log("error valllll", value);

    for (let i = 0; i < emailList.length; i++) {
      if (emailList[i] === value) {
        console.log("for loop");
        setLoading(true);
        setActiveToast(true);

        setTimeout(() => {
          setLoading(false);
          setShowWidget(true);
          setActiveToast(false);
        }, 2000);
      } else {
        setShowWidget(false);
        setShowLoginCard(true);
      }
    }
  };
  console.log(emailNotFound, "accountNotFound");
  console.log(emailList, "this is emailArray");

  const matchEmail = emailList.filter(
    (item) => item.toString() === value.toString()
  );
  console.log(matchEmail, "email match");

  return (
    <AppProvider i18n={enTranslations}>
      <Modal
        // activator={activator}
        open={active}
        onClose={emailHandler}
        title="Enter a valid email"
        primaryAction={{
          content: "Submit",
          onAction: saveEmailHandler,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: emailHandler,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <TextField
              // label="Email"
              type="email"
              placeholder="Email"
              value={value}
              onChange={handleChange}
            />
          </TextContainer>
        </Modal.Section>
      </Modal>
      {loading ? (
        <div
          style={{
            textAlign:'center',
            marginTop:"25%"
          }}
        >
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
      ) : showWiget ? (
        <Widget />
      ) : (
        <Page>
          <Card sectioned>
            <EmptyState
              heading="Welcome to Widget App"
              action={{
                content: "Email",
                onAction: (e) => emailHandler(e),
              }}
              secondaryAction={{
                content: "Learn more",
                url: "https://help.shopify.com",
              }}
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>
                Enter your email address that you used to create account on{" "}
                <strong>www.doamin.com</strong>.
              </p>
            </EmptyState>

            {showLoginCard && (
              <Card sectioned subdued>
                This email <strong>{emailNotFound[0]}</strong>{" "}
                is not associated with any domain. Create an account on{" "}
                <strong>
                  <a href="www.doamin.com">www.doamin.com</a>
                </strong>
              </Card>
            )}
          </Card>
        </Page>
      )}
      <div style={{ height: "250px" }}>
        <Frame>
          <Page>
            {/* <Button onClick={toggleActive}>Show Toast</Button> */}
            {toastMarkup}
          </Page>
        </Frame>
      </div>
    </AppProvider>
  );
}

export default App;

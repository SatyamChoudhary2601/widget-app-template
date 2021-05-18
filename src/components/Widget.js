import { useState } from "react";
import {
  Page,
  Card,
  Button,
  Heading,
  Stack,
} from "@shopify/polaris";
import Switch from "react-switch";

function Widget() {
  const [text] = useState(
    `<script type='text/javascript' charset='utf-8'>     
    var iframe = document.createElement('iframe');       
    document.body.appendChild(iframe);
 
    iframe.src = 'https://www.widget-app.myshopify.com/';       
    iframe.width = '100vh';
    iframe.height = '100vh';
 </script>`
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
    <>
      <Page>
        <Card sectioned>
          <Card sectioned subdued>
            <Heading>Widget App</Heading>
          </Card>
          <br />
          <p>
            Show the widget in the footer of the website. View widget (
            <span style={{ color: "blue" }}>
              https://www.widget-app.myshopify.com/
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
          <Stack distribution="fill">
            <Card sectioned subdued >
                <Stack distribution="fill">
                <Heading>Embedded Code</Heading>
                <div style={{ float: "right" }}>
                <Button
                  size="slim"
                  onClick={copyHandler}
                  primary={msg == null ? true : false}
                >
                  {msg === null ? "Copy" : "Copied!"}
                </Button>
              </div>
                </Stack>
              {/* copy functionality here! */}
              
              <pre>
                <code>{text}</code>
              </pre>
            </Card>

            <Card sectioned subdued title="Widget Preview">
              <iframe
                src="https://www.youtube.com/watch?v=ED_0g4bCkUk"
                title="W3Schools Free Online Web Tutorials"
                width="100%"
                height="100%"
                allowfullscreen
              ></iframe>
              {/* <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ED_0g4bCkUk"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe> */}
            </Card>
          </Stack>
        </Card>
        <br />
      </Page>
    </>
  );
}

export default Widget;

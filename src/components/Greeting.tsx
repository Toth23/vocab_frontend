import { Empty, Typography } from "antd";
import translatorIcon from "../assets/translator-icon.png";

const { Paragraph, Title } = Typography;

export const Greeting = () => (
  <div style={{ margin: 30 }}>
    <Empty
      image={translatorIcon}
      description={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title level={2}>Hello there!</Title>
          <Paragraph className={"greeting-paragraph"}>
            This is a simple website to record any vocabulary that you have
            learned (optionally with translations and examples).
          </Paragraph>
          <Title level={4}>How to start?</Title>
          <Paragraph className={"greeting-paragraph"}>
            Just add some words that you've recently learned.
          </Paragraph>
          <Title level={4}>Where is my previous vocabulary?</Title>
          <Paragraph className={"greeting-paragraph"}>
            The data is associated with your User ID (stored in the browser). If
            you want to sync across browsers, just set your User ID to the same
            value.
          </Paragraph>
        </div>
      }
    />
  </div>
);

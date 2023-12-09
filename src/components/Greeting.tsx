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
          <Title level={3}>Hello there!</Title>
          <Paragraph className={"greeting-paragraph"}>
            This is a simple website to record any vocabulary that you have
            learned (optionally with translations and examples).
          </Paragraph>
          <Paragraph className={"greeting-paragraph"}>
            If you're new here, just look around and add some words that you've
            recently learned.
          </Paragraph>
          <Paragraph className={"greeting-paragraph"}>
            If you've been here before and missing your data, you might want to
            switch your User ID to what you had before.
          </Paragraph>
        </div>
      }
    />
  </div>
);

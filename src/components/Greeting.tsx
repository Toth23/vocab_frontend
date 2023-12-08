import { Col, Empty, Row, Typography } from "antd";
import translatorIcon from "../assets/translator-icon.png";

const { Paragraph, Title } = Typography;

export const Greeting = () => (
  <Row justify="center" align="middle" style={{ margin: 30 }}>
    <Col span={8}>
      <Empty
        image={translatorIcon}
        description={
          <>
            <Title level={3}>Hello there!</Title>
            <Paragraph>
              This is a simple website to record any vocabulary that you have
              learned (optionally with translations and examples).
            </Paragraph>
            <Paragraph>
              If you're new here, just look around and add some words that
              you've recently learned.
            </Paragraph>
            <Paragraph>
              If you've been here before and missing your data, you might want
              to switch your User ID to what you had before.
            </Paragraph>
          </>
        }
      />
    </Col>
  </Row>
);

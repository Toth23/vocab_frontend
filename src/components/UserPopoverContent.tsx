import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import { CopyOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

interface UserPopoverContentProps {
  userId: string;
  setUserId: (newId: string) => void;
  closePopover: () => void;
}

export const UserPopoverContent = ({
  userId,
  setUserId,
  closePopover,
}: UserPopoverContentProps) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = () => {
    const newUserId = form.getFieldValue("newUserId");

    setUserId(newUserId);
    form.resetFields();
    form.setFieldValue("oldUserId", newUserId);
    closePopover();
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(userId)
      .then(() => messageApi.success("Copied to clipboard"));
  };

  return (
    <div style={{ width: 330 }}>
      <Paragraph>
        Your User ID is your login data. You can switch it here to have the same
        data in multiple browsers or devices.
      </Paragraph>
      <Paragraph>
        <Text type={"warning"}>
          Beware that anyone who sees your User ID will be able to see, modify
          or delete your vocabulary.
        </Text>
      </Paragraph>

      <Divider />

      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{ oldUserId: userId }}
        layout={"vertical"}
      >
        <Form.Item label={"Current User ID"}>
          <Space.Compact>
            {contextHolder}
            <Form.Item name={"oldUserId"}>
              <Input.Password readOnly style={{ minWidth: 300 }} />
            </Form.Item>
            <Button icon={<CopyOutlined />} onClick={copyToClipboard} />
          </Space.Compact>
        </Form.Item>
        <Form.Item
          name={"newUserId"}
          label={"New User ID"}
          required={true}
          rules={[{ required: true, message: "Your User ID cannot be empty!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Flex justify={"space-between"}>
            <Button
              onClick={() => {
                form.resetFields();
                closePopover();
              }}
            >
              Cancel
            </Button>
            <Button type={"primary"} htmlType={"submit"}>
              Save
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

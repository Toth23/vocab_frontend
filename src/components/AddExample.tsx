import { Button, Flex, Form, Input, InputRef, Popover, Tooltip } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

interface AddExampleProps {
  wordId: string;
  addExample: (wordId: string, example: string) => Promise<void>;
}

export const AddExample = ({ wordId, addExample }: AddExampleProps) => {
  const [addExamplePopoverOpen, setAddExamplePopoverOpen] = useState(false);
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  const focusInput = () => inputRef.current?.focus();

  const handleFinish = async () => {
    await addExample(wordId, form.getFieldValue("example"));
    setAddExamplePopoverOpen(false);
    form.resetFields();
  };

  const addExampleForm = (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item name={"example"} required={true}>
        <Input ref={inputRef} />
      </Form.Item>
      <Form.Item>
        <Flex justify={"space-between"}>
          <Button
            onClick={() => {
              form.resetFields();
              setAddExamplePopoverOpen(false);
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
  );

  return (
    <Popover
      title={"Add example"}
      content={addExampleForm}
      open={addExamplePopoverOpen}
      afterOpenChange={focusInput}
    >
      <div>
        <Tooltip title={"Add example"}>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => setAddExamplePopoverOpen(true)}
            type={"text"}
          />
        </Tooltip>
      </div>
    </Popover>
  );
};

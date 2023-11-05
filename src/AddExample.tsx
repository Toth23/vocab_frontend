import {Button, Flex, Form, Input, Popover, Tooltip} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useState} from "react";

interface AddExampleProps {
  wordId: number;
  addExample: (wordId: number, example: string) => void;
}

export const AddExample = ({wordId, addExample}: AddExampleProps) => {
  const [addExamplePopoverOpen, setAddExamplePopoverOpen] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = () => {
    addExample(wordId, form.getFieldValue("example"));
    setAddExamplePopoverOpen(false);
    form.resetFields();
  }

  const addExampleForm = <Form form={form} onFinish={handleFinish}>
    <Form.Item name={"example"} required={true}>
      <Input/>
    </Form.Item>
    <Form.Item>
      <Flex justify={"space-between"}>
        <Button onClick={() => {
          form.resetFields();
          setAddExamplePopoverOpen(false);
        }}>
          Cancel
        </Button>
        <Button type={"primary"} htmlType={"submit"}>
          Save
        </Button>
      </Flex>
    </Form.Item>
  </Form>

  return <Popover
    title={"Add example"}
    content={addExampleForm}
    open={addExamplePopoverOpen}
  >
    <div>
      <Tooltip title={"Toggle examples"}>
        <Button icon={<PlusCircleOutlined/>} onClick={() => setAddExamplePopoverOpen(true)} type={"text"}/>
      </Tooltip>
    </div>
  </Popover>;
}
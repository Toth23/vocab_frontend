import { Word, WordUpdate } from "../utils/types.ts";
import { Button, Flex, Form, Input } from "antd";

interface EditWordProps {
  save: (wordUpdate: WordUpdate) => Promise<void>;
  reset: () => void;
  wordEntity: Word;
}

export const EditWord = ({ wordEntity, save, reset }: EditWordProps) => {
  const [form] = Form.useForm();

  const handleFinish = async () => {
    const word = form.getFieldValue("word");
    const translation = form.getFieldValue("translation");
    const source = form.getFieldValue("source");

    await save({ id: wordEntity.id, word, translation, source });
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={wordEntity}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name={"word"}
          label={"Word"}
          required={true}
          rules={[{ required: true, message: "Don't leave it empty!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"translation"} label={"Translation"}>
          <Input />
        </Form.Item>
        <Form.Item name={"source"} label={"Source"}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ flex: 1 }}>
          <Flex justify={"space-between"}>
            <Button
              onClick={() => {
                form.resetFields();
                reset();
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
    </>
  );
};

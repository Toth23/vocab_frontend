import {Button, Flex, Form, Input, Modal} from "antd";

interface NewWordProps {
  isModalOpen: boolean;
  addWord: (word: string, translation?: string, source?: string) => Promise<void>;
  onModalClose: () => void;
}

export const NewWordModal = ({addWord, isModalOpen, onModalClose}: NewWordProps) => {
  const [form] = Form.useForm();

  const handleFinish = async () => {
    const word = form.getFieldValue("word");
    const translation = form.getFieldValue("translation");
    const source = form.getFieldValue("source");

    await addWord(word, translation, source);
    form.resetFields();
    onModalClose();
  }

  return (
    <Modal title="Add new word" open={isModalOpen} footer={null}>
      <Form form={form} onFinish={handleFinish} labelCol={{ span: 8 }}>
        <Form.Item name={"word"} label={"Word"} required={true}>
          <Input/>
        </Form.Item>
        <Form.Item name={"translation"} label={"Translation"}>
          <Input/>
        </Form.Item>
        <Form.Item name={"source"} label={"Source"}>
          <Input/>
        </Form.Item>
        <Form.Item>
          <Flex justify={"space-between"}>
            <Button onClick={() => {
              form.resetFields();
              onModalClose();
            }}>
              Cancel
            </Button>
            <Button type={"primary"} htmlType={"submit"}>
              Save
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}

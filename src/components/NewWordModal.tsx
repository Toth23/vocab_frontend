import { Button, Divider, Flex, Form, Input, Modal, Tooltip } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { WordCreation } from "../utils/types.ts";
import "../styles/NewWordModal.css";

interface NewWordProps {
  isModalOpen: boolean;
  addWord: (wordCreation: WordCreation) => Promise<void>;
  closeModal: () => void;
}

export const NewWordModal = ({
  addWord,
  isModalOpen,
  closeModal,
}: NewWordProps) => {
  const [form] = Form.useForm();

  const handleFinish = async (shouldCreateAnother = false) => {
    const word = form.getFieldValue("word");
    const translation = form.getFieldValue("translation");
    const source = form.getFieldValue("source");
    const examples = form
      .getFieldValue("examples")
      .filter((ex: string | undefined) => ex && ex.trim().length > 0);

    await addWord({ word, translation, source, examples });

    if (shouldCreateAnother) {
      form.resetFields(["word", "translation", "examples"]);
    } else {
      form.resetFields();
      closeModal();
    }
  };

  return (
    <Modal
      title="Add new word"
      open={isModalOpen}
      footer={null}
      onCancel={closeModal}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={() => handleFinish(false)}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        <Divider />
        <Form.Item
          name={"word"}
          label={"Word"}
          required={true}
          rules={[
            { required: true, message: "Which word do you want to add?" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"translation"} label={"Translation"}>
          <Input />
        </Form.Item>
        <Form.Item name={"source"} label={"Source"}>
          <Input />
        </Form.Item>
        <Divider />
        <Form.List name="examples" initialValue={[""]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Flex key={key} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name]}
                    label={`Example ${index + 1}`}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ flex: "1" }}
                  >
                    <Input.TextArea
                      rows={1}
                      placeholder="Enter example (or leave empty)"
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ flex: "0 0 32px" }}
                  />
                </Flex>
              ))}
              <Flex align="baseline" justify={"flex-end"}>
                <Tooltip title={"Add example"} placement={"right"}>
                  <PlusCircleOutlined
                    onClick={() => add()}
                    style={{ marginRight: 18 }}
                  />
                </Tooltip>
              </Flex>
            </>
          )}
        </Form.List>
        <Divider />
        <Form.Item wrapperCol={{}}>
          <div className={"add-word-button-row"}>
            <Button
              onClick={() => {
                form.resetFields();
                closeModal();
              }}
            >
              Cancel
            </Button>
            <div className={"add-word-save-buttons"}>
              <Button type={"primary"} ghost onClick={() => handleFinish(true)}>
                Save & Add another
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                type={"primary"}
                htmlType={"submit"}
              >
                Save
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

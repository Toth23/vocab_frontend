import {Button, Checkbox, Divider, Flex, Form, Input, Modal, Tooltip} from "antd";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {WordCreation} from "../utils/types.ts";

interface NewWordProps {
  isModalOpen: boolean;
  addWord: (wordCreation: WordCreation) => Promise<void>;
  closeModal: () => void;
}

export const NewWordModal = ({addWord, isModalOpen, closeModal}: NewWordProps) => {
  const [form] = Form.useForm();

  const handleFinish = async () => {
    const word = form.getFieldValue("word");
    const translation = form.getFieldValue("translation");
    const source = form.getFieldValue("source");
    const examples = form.getFieldValue("examples").filter((ex: string) => ex.trim().length > 0);

    await addWord({word, translation, source, examples});

    const createAnother = form.getFieldValue("another");
    if (createAnother) {
      form.resetFields(["word", "translation", "examples"])
    } else {
      form.resetFields();
      closeModal();
    }
  }

  return (
    <Modal title="Add new word" open={isModalOpen} footer={null} onCancel={closeModal} maskClosable={false}>
      <Form form={form} onFinish={handleFinish} labelCol={{span: 8}} wrapperCol={{span: 12}}>
        <Divider/>
        <Form.Item name={"word"} label={"Word"} required={true}
                   rules={[{required: true, message: 'Which word do you want to add?'}]}>
          <Input/>
        </Form.Item>
        <Form.Item name={"translation"} label={"Translation"}>
          <Input/>
        </Form.Item>
        <Form.Item name={"source"} label={"Source"}>
          <Input/>
        </Form.Item>
        <Divider/>
        <Form.List
          name="examples"
          initialValue={['']}
        >
          {(fields, {add, remove}) => (
            <>
              {fields.map(({key, name, ...restField}, index) => (
                <Flex key={key} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name]}
                    label={`Example ${index + 1}`}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    style={{flex: '1'}}
                  >
                    <Input placeholder="Enter example (or leave empty)" style={{}}/>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} style={{flex: '0 0 32px'}}/>
                </Flex>
              ))}
              <Flex align="baseline" justify={"flex-end"}>
                <Tooltip title={"Add example"} placement={"right"}>
                  <PlusCircleOutlined onClick={() => add()} style={{marginRight: 18}}/>
                </Tooltip>
              </Flex>
            </>
          )}
        </Form.List>
        <Divider/>
        <Form.Item name={"another"}
                   label={"Create another"}
                   valuePropName="checked"
                   labelCol={{span: 8, offset: 14}}
                   wrapperCol={{span: 2}}
                   style={{margin: 0}}>
          <Checkbox/>
        </Form.Item>
        <Form.Item wrapperCol={{flex: 1}}>
          <Flex justify={"space-between"} style={{padding: 20}}>
            <Button onClick={() => {
              form.resetFields();
              closeModal();
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

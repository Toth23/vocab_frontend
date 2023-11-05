import {Button, Flex, Input, Popover, Space, Tooltip} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useState} from "react";

interface AddExampleProps {
  wordId: number;
  addExample: (wordId: number, example: string) => void;
}

export const AddExample = ({wordId, addExample}: AddExampleProps) => {
  const [newExampleInput, setNewExampleInput] = useState('')
  const [addExamplePopoverOpen, setAddExamplePopoverOpen] = useState(false);

  const addExampleContent = <Space direction={"vertical"}>
    <Input value={newExampleInput} onChange={e => setNewExampleInput(e.target.value)}/>
    <Flex justify={"space-between"}>
      <Button onClick={() => {
        setNewExampleInput('');
        setAddExamplePopoverOpen(false);
      }}>
        Cancel
      </Button>
      <Button type={"primary"} disabled={newExampleInput.length === 0} onClick={() => {
        addExample(wordId, newExampleInput);
        setNewExampleInput('');
        setAddExamplePopoverOpen(false);
      }}>
        Save
      </Button>
    </Flex>
  </Space>

  return <Popover
    title={"Add example"}
    content={addExampleContent}
    open={addExamplePopoverOpen}
  >
    <div>
      <Tooltip title={"Toggle examples"}>
        <Button icon={<PlusCircleOutlined/>} onClick={() => setAddExamplePopoverOpen(true)} type={"text"}/>
      </Tooltip>
    </div>
  </Popover>;
}
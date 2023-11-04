import {Word} from './types';
import {useState} from 'react';
import {Button, Card, Divider, Flex, Input, Popconfirm, Popover, Skeleton, Tooltip, Typography} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  ReadOutlined
} from '@ant-design/icons';
import {ExampleDisplay} from "./ExampleDisplay.tsx";

const {Text} = Typography;

interface WordDisplayProps {
  word: Word;
  deleteWord: (wordId: number) => void;
  addExample: (wordId: number, example: string) => void;
  deleteExample: (wordId: number, exampleId: number) => void;
}

export const WordDisplay = ({word: wordEntity, deleteWord, addExample, deleteExample}: WordDisplayProps) => {

  const [showTranslation, setShowTranslation] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [newExampleInput, setNewExampleInput] = useState('')

  const toggleExamples = () => setShowExamples(current => !current);

  const {id, word, translation, source, date_added, examples} = wordEntity;

  const editButton = <Button
    type={"text"}
    icon={<EditOutlined/>}
    key={"edit"}
  />
  const deleteButton =
    <Popconfirm
      title="Delete this word"
      description="Are you sure you want to delete this word?"
      onConfirm={() => deleteWord(id)}
      okText="Yes"
      cancelText="No"
      key={"delete"}
    >
      <Button
        type={"text"}
        icon={<DeleteOutlined/>}
      />
    </Popconfirm>

  const toggleTranslationButton = <Tooltip title={"Toggle translation"}>
    <Button
      icon={showTranslation ? <EyeInvisibleOutlined/> : <EyeOutlined/>}
      onClick={() => setShowTranslation(current => !current)}
      key={"toggleTranslation"}
      type={"text"}
    />
  </Tooltip>
  const toggleExamplesButton = <Tooltip title={"Toggle examples"}>
    <Button
      icon={<ReadOutlined/>}
      onClick={toggleExamples}
      key={"toggleExamples"}
      type={"text"}
    />
  </Tooltip>
  const addExampleContent = <>
    <Input value={newExampleInput} onChange={e => setNewExampleInput(e.target.value)}/>
    <Button disabled={newExampleInput.length === 0} onClick={() => {
      addExample(id, newExampleInput)
      setNewExampleInput('')
    }}>Save
    </Button>
  </>
  const addExamplePopover = <Popover title={"Add example"} content={addExampleContent}>
    <Button icon={<PlusCircleOutlined/>} type={"text"}/>
  </Popover>

  return (
    <Card title={word} extra={[editButton, deleteButton]} className="word-card" key={id} actions={[
      toggleTranslationButton,
      toggleExamplesButton,
      addExamplePopover,
    ]}>
      <div className="word-card-content">
        <Flex justify={"space-between"}>
          <div>{source}</div>
          <div>{date_added}</div>
        </Flex>
        {showTranslation ?
          <Text italic style={{margin: 0, padding: "14px 0", minHeight: 44}}>{translation}</Text>
          :
          <Skeleton title={false} paragraph={{rows: 1, width: "100%"}}/>
        }
        <Divider/>
        <ExampleDisplay examples={examples}
                        wordId={id}
                        deleteExample={deleteExample}
                        showExamples={showExamples}
        />
      </div>
    </Card>
  )
}

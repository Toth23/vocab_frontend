import {Word, WordUpdate} from '../utils/types.ts';
import {useState} from 'react';
import {Button, Card, Divider, Flex, Popconfirm, Skeleton, Tooltip, Typography} from "antd";
import {DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, ReadOutlined} from '@ant-design/icons';
import {ExampleDisplay} from "./ExampleDisplay.tsx";
import {AddExample} from "./AddExample.tsx";
import {EditWord} from './EditWord.tsx';

const {Text} = Typography;

interface WordDisplayProps {
  word: Word;
  editWord: (wordUpdate: WordUpdate) => Promise<void>;
  deleteWord: (wordId: number) => Promise<void>;
  addExample: (wordId: number, example: string) => Promise<void>;
  deleteExample: (wordId: number, exampleId: number) => Promise<void>;
}

export const WordDisplay = ({word: wordEntity, editWord, deleteWord, addExample, deleteExample}: WordDisplayProps) => {
  const [showTranslation, setShowTranslation] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const toggleExamples = () => setShowExamples(current => !current);
  let saveEdit = async (wordUpdate: WordUpdate) => {
    await editWord(wordUpdate);
    setEditMode(false);
  };

  const {id, word, translation, source, date_added, examples} = wordEntity;

  const editButton = <Button
    type={"text"}
    icon={<EditOutlined/>}
    key={"edit"}
    onClick={() => setEditMode(true)}
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

  const mainContentViewMode = <>
    <Flex justify={"space-between"}>
      <div>{source}</div>
      <div>{date_added}</div>
    </Flex>
    {showTranslation ?
      <Text italic style={{margin: "0 auto", padding: "14px 0", minHeight: 44}}>{translation}</Text>
      :
      <Skeleton title={false} paragraph={{rows: 1, width: "100%"}}/>
    }
    <Divider/>
    <ExampleDisplay examples={examples}
                    wordId={id}
                    deleteExample={deleteExample}
                    showExamples={showExamples}
    />
  </>

  return (
    <Card title={word} extra={[editButton, deleteButton]} className="word-card" key={id} actions={[
      toggleTranslationButton,
      toggleExamplesButton,
      <AddExample wordId={id} addExample={addExample} key={"add-example"}/>,
    ]}>
      <div className="word-card-content">
        {editMode ?
          <EditWord save={saveEdit} reset={() => setEditMode(false)} wordEntity={wordEntity}/>
          :
          mainContentViewMode
        }
      </div>
    </Card>
  )
}

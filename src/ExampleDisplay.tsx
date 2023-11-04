import {Example} from './types';
import {Empty, List, Skeleton} from "antd";

interface ExampleDisplayProps {
  wordId: number;
  examples: Example[];
  showExamples: boolean;
  deleteExample: (wordId: number, exampleId: number) => void;
}

export const ExampleDisplay = ({wordId, examples, showExamples, deleteExample}: ExampleDisplayProps) => {

  const hasExamples = examples.length > 0;

  if (!hasExamples) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"no examples"}/>
  }

  return (
    <>
      {showExamples ?
        <>
          <List size="small"
                dataSource={examples}
                style={{height: "inherit"}}
                renderItem={({id, example}) => <List.Item>
                  <div>{example}</div>
                  <button onClick={() => deleteExample(wordId, id)}>Delete example</button>
                </List.Item>}
          />
        </>
        :
        <Skeleton title={false} paragraph={{rows: examples.length, width: "100%"}} style={{height: "inherit"}}/>
      }
    </>
  )
}

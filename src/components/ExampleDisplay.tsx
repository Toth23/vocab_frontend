import {Example} from '../utils/types.ts';
import {Button, Empty, List, Skeleton, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

interface ExampleDisplayProps {
  wordId: number;
  examples: Example[];
  showExamples: boolean;
  deleteExample: (wordId: number, exampleId: number) => Promise<void>;
}

export const ExampleDisplay = ({wordId, examples, showExamples, deleteExample}: ExampleDisplayProps) => {

  const hasExamples = examples.length > 0;
  const skeletonRows = Math.min(4, examples.length);

  if (!hasExamples) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"no examples"}/>
  }

  return (
    <div style={{height: "inherit"}}>
      <div style={{maxHeight: 150, overflowY: "auto"}}>
        {showExamples ?
          <List
            size="small"
            dataSource={examples}
            renderItem={({id, example}) => (
              <List.Item
                extra={(
                  <Tooltip title={"Delete example"}>
                    <Button onClick={() => deleteExample(wordId, id)} type={"text"} icon={<DeleteOutlined/>}/>
                  </Tooltip>)}
                style={{padding: 0}}
              >
                <div>{example}</div>
              </List.Item>)}
          />
          :
          <Skeleton title={false} paragraph={{rows: skeletonRows, width: "100%"}}
                    style={{height: "inherit"}}/>
        }
      </div>
    </div>
  );
}

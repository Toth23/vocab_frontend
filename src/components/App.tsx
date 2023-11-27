import "../styles/App.css";
import useSWR from "swr";
import { Word } from "../utils/types.ts";
import { NewWordModal } from "./NewWordModal.tsx";
import { WordDisplay } from "./WordDisplay.tsx";
import { Button, Image, Layout, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import logo from "../assets/知识_white.png";
import {
  baseUrl,
  customUserIdHeader,
  getBackendCalls,
} from "../utils/getBackendCalls.ts";
import { v4 as uuid } from "uuid";
import useLocalStorageState from "use-local-storage-state";

const fetcher = ({ url, userId }: { url: string; userId: string }) =>
  fetch(url, { headers: { [customUserIdHeader]: userId } }).then((res) =>
    res.json(),
  );

function App() {
  const [userId] = useLocalStorageState<string>("user-id", {
    defaultValue: localStorage.getItem("user-id") ?? uuid(),
  });

  const { data, error, isLoading, mutate } = useSWR(
    { url: `${baseUrl}/vocab`, userId },
    fetcher,
  );

  const [isNewWordModalOpen, setIsNewWordModalOpen] = useState(false);

  if (isLoading) return "Loading...";
  if (error || !data) return "An error has occurred.";

  const { addWord, editWord, deleteWord, addExample, deleteExample } =
    getBackendCalls(data, mutate);

  return (
    <Layout>
      <Layout.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          src={logo}
          height={60}
          width={128}
          style={{ paddingTop: 4 }}
          preview={false}
        />
        <Tooltip title={"Add new word"}>
          <Button
            shape={"circle"}
            size={"large"}
            icon={<PlusOutlined />}
            onClick={() => setIsNewWordModalOpen(true)}
          />
        </Tooltip>
      </Layout.Header>
      <div className="wordlist">
        {data.words.map((word: Word) => (
          <WordDisplay
            word={word}
            key={word.id}
            editWord={editWord}
            deleteWord={deleteWord}
            addExample={addExample}
            deleteExample={deleteExample}
          />
        ))}
      </div>
      <NewWordModal
        addWord={addWord}
        isModalOpen={isNewWordModalOpen}
        closeModal={() => setIsNewWordModalOpen(false)}
      />
    </Layout>
  );
}

export default App;

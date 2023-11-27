import { KeyedMutator } from "swr/_internal";
import { AppState, Word, WordCreation, WordUpdate } from "./types.ts";

export const baseUrl =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export const customUserIdHeader = "x-user-identifier";

const getHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  [customUserIdHeader]: JSON.parse(localStorage.getItem("user-id") ?? ''),
});

const backendCall = (
  path: string,
  method = "GET",
  body: string | null = null,
) => fetch(`${baseUrl}/${path}`, { method, headers: getHeaders(), body });

export const getBackendCalls = (
  data: AppState,
  mutate: KeyedMutator<AppState>,
) => {
  const addWord = async (wordCreation: WordCreation) => {
    const response = await backendCall(
      "vocab",
      "POST",
      JSON.stringify(wordCreation),
    );
    const responseJson = await response.json();
    await mutate({ ...data, words: [...data.words, responseJson.word] });
  };
  const editWord = async (wordUpdate: WordUpdate) => {
    const payload = {
      word: wordUpdate.word,
      translation: wordUpdate.translation,
      source: wordUpdate.source,
    };
    await backendCall(`vocab/${wordUpdate.id}`, "PUT", JSON.stringify(payload));
    await mutate({
      ...data,
      words: data.words.map((w: Word) =>
        w.id === wordUpdate.id ? { ...w, ...wordUpdate } : w,
      ),
    });
  };
  const deleteWord = async (wordId: string) => {
    await backendCall(`vocab/${wordId}`, "DELETE");
    await mutate({
      ...data,
      words: data.words.filter((w: Word) => w.id !== wordId),
    });
  };
  const addExample = async (wordId: string, example: string) => {
    const payload = { example };
    const response = await backendCall(
      `vocab/${wordId}/examples`,
      "POST",
      JSON.stringify(payload),
    );
    const responseJson = await response.json();
    await mutate({
      ...data,
      words: data.words.map((w: Word) =>
        w.id !== wordId ? w : { ...w, examples: [...w.examples, responseJson] },
      ),
    });
  };
  const deleteExample = async (wordId: string, exampleId: string) => {
    await backendCall(`vocab/${wordId}/examples/${exampleId}`, "DELETE");
    await mutate({
      ...data,
      words: data.words.map((w: Word) =>
        w.id === wordId
          ? w
          : { ...w, examples: w.examples.filter((e) => e.id !== exampleId) },
      ),
    });
  };

  return { addWord, editWord, deleteWord, addExample, deleteExample };
};

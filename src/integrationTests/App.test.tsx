import { render, screen, waitFor } from "@testing-library/react";
import App from "../components/App.tsx";
import { http, HttpResponse } from "msw";
import { baseUrl } from "../utils/getBackendCalls.ts";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { Word, WordCreation } from "../utils/types.ts";
import { v4 as uuid } from "uuid";

describe("The App", () => {
  let words: Word[] = [
    {
      id: uuid(),
      word: "word 1",
      source: "source 1",
      translation: "tr 1",
      date_added: "01.01.2023",
      examples: [{ id: uuid(), example: "ex 1" }],
    },
    {
      id: uuid(),
      word: "word 2",
      source: "source 2",
      translation: "tr 2",
      date_added: "01.01.2023",
      examples: [
        { id: uuid(), example: "ex 2" },
        { id: uuid(), example: "ex 3" },
      ],
    },
  ];
  const server = setupServer(
    http.get(`${baseUrl}/vocab`, () => {
      return HttpResponse.json({ words });
    }),
    http.post(`${baseUrl}/vocab`, async ({ request }) => {
      const requestJson = (await request.json()) as WordCreation;
      const newWordId = uuid();
      const newWord: Word = {
        id: newWordId,
        date_added: "01.01.2023",
        ...requestJson,
        examples: [],
      };
      words.push(newWord);
      return HttpResponse.json({ word: newWord });
    }),
    http.delete(`${baseUrl}/vocab/:id`, async ({ params }) => {
      words = words.filter((w) => w.id.toString() !== params.id);
      return HttpResponse.json();
    }),
    http.post(
      `${baseUrl}/vocab/:wordId/examples`,
      async ({ params, request }) => {
        const { example } = (await request.json()) as { example: string };
        const newExampleId = uuid();
        const newExample = { id: newExampleId, example };
        words = words.map((w) =>
          w.id.toString() !== params.wordId
            ? w
            : { ...w, examples: [...w.examples, newExample] },
        );
        return HttpResponse.json(newExample);
      },
    ),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should display the loading state", () => {
    // when
    render(<App />);

    // then
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should load all words from the backend", async () => {
    // when
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // then
    words.forEach((w) => {
      expect(screen.getByText(w.word)).toBeInTheDocument();
      expect(screen.getByText(w.source!)).toBeInTheDocument();
      expect(screen.queryByText(w.translation!)).not.toBeInTheDocument();
    });

    // when revealing translations
    const eyeIcons = screen.getAllByLabelText("eye");
    for (const eye of eyeIcons) {
      await userEvent.click(eye);
    }

    // then
    words.forEach((w) => {
      expect(screen.getByText(w.translation!)).toBeInTheDocument();
    });

    // when revealing examples
    const readIcons = screen.getAllByLabelText("read");
    for (const readIcon of readIcons) {
      await userEvent.click(readIcon);
    }

    // then
    words.forEach((w) => {
      w.examples.forEach((ex) =>
        expect(screen.getByText(ex.example)).toBeInTheDocument(),
      );
    });
  });

  it("should add an example", async () => {
    // when
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const readIcons = screen.getAllByLabelText("read");
    await userEvent.click(readIcons[0]);

    const addExampleButtons = screen.getAllByLabelText("plus-circle");
    await userEvent.click(addExampleButtons[0]);

    const addExampleInput = await screen.findByRole("textbox");

    await userEvent.type(addExampleInput, "a new example");
    await userEvent.click(screen.getByText("Save"));

    // then
    expect(await screen.findByText("a new example")).toBeInTheDocument();
  });

  it("should add another word", async () => {
    // when
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    await userEvent.click(screen.getByLabelText("plus"));

    const wordField = screen.getByLabelText("Word");
    await userEvent.type(wordField, "new word");

    await userEvent.click(screen.getByText("Save"));

    // then
    const expectedWords = [...words.map((w) => w.word), "new word"];

    for (const word of expectedWords) {
      expect(await screen.findByText(word)).toBeInTheDocument();
    }
  });

  it("should delete a word", async () => {
    // when
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const deleteIcons = screen.getAllByLabelText("delete");
    await userEvent.click(deleteIcons[0]);
    await userEvent.click(screen.getByText("Yes"));

    // then
    await waitFor(() => {
      expect(screen.queryByText("word 1")).not.toBeInTheDocument();
    });
    expect(screen.getByText("word 2")).toBeInTheDocument();
  });
});

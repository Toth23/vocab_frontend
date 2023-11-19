import {render, screen, waitFor} from "@testing-library/react";
import App from "../components/App.tsx";
import {http, HttpResponse} from "msw";
import {baseUrl} from "../utils/getBackendCalls.ts";
import {setupServer} from "msw/node";

describe('The App', () => {
  const words = [
    {id: 1, word: 'word 1', source: 'source 1', translation: 'tr 1', examples: []},
    {id: 2, word: 'word 2', source: 'source 2', translation: 'tr 2', examples: []},
  ];
  const server = setupServer(
    http.get(`${baseUrl}/vocab`, () => {
      return HttpResponse.json({words});
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should display the loading state', () => {
    // when
    render(<App/>);

    // then
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  });

  it('should all words loaded from the backend', async () => {
    // when
    render(<App/>);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // then
    words.forEach(w =>
      expect(screen.getByText(w.word)).toBeInTheDocument()
    );
  });
});

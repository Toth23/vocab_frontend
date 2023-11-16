import {render, screen} from "@testing-library/react";
import App from "./App.tsx";
import {http, HttpResponse} from "msw";
import {baseUrl} from "./getBackendCalls.ts";

describe('The App', () => {
  http.get(`${baseUrl}/vocab`, () => HttpResponse.json());

  it('should display the loading state', async () => {
    // when
    render(<App/>);

    // then
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  });
});

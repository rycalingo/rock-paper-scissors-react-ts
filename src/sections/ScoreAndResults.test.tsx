import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OptionsProvider } from "../context/optionsContext";
import ScoreAndResults from "./ScoreAndResults";
import ChooseAndPlay from "./ChooseAndPlay";
import { act } from "react-dom/test-utils";

describe("ScoreAndResults", () => {
	it("should dispaly 2 seconds on the screen after we wait 1 second", () => {
		vi.useFakeTimers();

		render(
			<OptionsProvider>
				<ScoreAndResults />
				<ChooseAndPlay />
			</OptionsProvider>
		);

		const hand = screen.getByText(/paper/i);
		expect(hand).toBeInTheDocument();

		fireEvent.click(hand);
		fireEvent.click(screen.getByText("Play"));

		act(() => {
			vi.advanceTimersByTime(1000);
		});

		screen.debug();

		expect(screen.getByTestId("timer")).toHaveTextContent("2");
	});
});

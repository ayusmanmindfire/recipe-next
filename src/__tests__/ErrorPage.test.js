// React and third-party imports
import { render, screen } from "@testing-library/react";

// Static imports
import ErrorPage from "../app/error/page";
import { errorStrings } from "../utils/constantStrings";

// Mock image path import to avoid issues with `next/image`
jest.mock("../utils/imageImports", () => ({
    imagePaths: {
        errorImage: "/mocked-error-image.jpg" // Simple string path
    }
}));

describe("ErrorPage Component", () => {
    test("renders ErrorPage with the correct message and image", () => {
        render(<ErrorPage />);

        // Check for the specific error message
        expect(screen.getByText(errorStrings.wentWrong)).toBeInTheDocument();

        // Check for the error image with alt text
        const image = screen.getByAltText("Error image");
        expect(image).toBeInTheDocument();
        // expect(image).toHaveAttribute("src", "/mocked-error-image.jpg"); // Directly check src string
    });
});

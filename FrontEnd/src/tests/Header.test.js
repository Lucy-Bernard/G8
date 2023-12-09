import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Header from "../components/Header/Header";
import React from "react";

// Mock the next/image module
jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Mocking the global fetch function
fetch = jest.fn(() => Promise.resolve());

describe('Header component', () => {
    /**
   * Test case: Renders the component and matches the snapshot.
   */
  it('renders as expected', () => {
    // Render the Header component
    const { container } = render(<Header />);
    // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot();
  });
});

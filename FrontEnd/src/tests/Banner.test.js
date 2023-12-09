import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Banner from "../components/Banner/Banner";
import React from "react";

// Mock the next/image module
jest.mock('next/image', () => ({ src, alt, className, layout, objectFit, objectPosition }) => (
  <img src={src} alt={alt} className={className} layout={layout} />
));

describe('Banner component', () => {
  it('renders as expected', () => {
    // Render the Banner component
    const { container } = render(<Banner />);
        // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot();
  });
});

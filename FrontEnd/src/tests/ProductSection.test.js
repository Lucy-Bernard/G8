import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import ProductSection from "../components/ProductSection/ProductSection";

  /**
   * Test case: Renders the component with sample products and matches the snapshot.
   */
describe('ProductSection component', () => {
  it('renders as expected', () => {
    const products = [
      { productId: 1, productName: 'Product 1', unitPrice: 10.99, imageLink: 'product1.jpg' },
      { productId: 2, productName: 'Product 2', unitPrice: 19.99, imageLink: 'product2.jpg' },
     
    ];

    // Render the ProductSection component with sample products
    const { container } = render(<ProductSection title="Featured Products" products={products} />);
    // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot();
  });
});

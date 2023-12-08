import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import ProductSection from "../components/ProductSection/ProductSection";

describe('ProductSection component', () => {
  it('renders as expected', () => {
    const products = [
      { productId: 1, productName: 'Product 1', unitPrice: 10.99, imageLink: 'product1.jpg' },
      { productId: 2, productName: 'Product 2', unitPrice: 19.99, imageLink: 'product2.jpg' },
      // Add more sample products as needed
    ];

    const { container } = render(<ProductSection title="Featured Products" products={products} />);
    expect(container).toMatchSnapshot();
  });
});

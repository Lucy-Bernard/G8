import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Search from '../components/AddToCartButton/AddToCartButton'
import AddToCartButton from "../components/AddToCartButton/AddToCartButton"

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn()
        }
    }
}))

fetch = jest.fn(() => Promise.resolve());

it('component renders as expected', async () => {
    const { container } = render(<AddToCartButton />)
    expect(container).toMatchSnapshot()
})
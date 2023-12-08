import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Search from '../components/Search/Search'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn()
        }
    }
}))

fetch = jest.fn(() => Promise.resolve());

it('component renders as expected', async () => {
    const { container } = render(<Search />)
    expect(container).toMatchSnapshot()
})
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Search from '../components/NavigationBar/NavigationBar'
import NavigationBar from "../components/NavigationBar/NavigationBar"

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn()
        }
    }
}))

fetch = jest.fn(() => Promise.resolve());

it('component renders as expected', async () => {
    const { container } = render(<NavigationBar />)
    expect(container).toMatchSnapshot()
})
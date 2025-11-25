import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"
import { MemoryRouter } from "react-router-dom"
import Resume from "../pages/Resume"

// Mock useAuth hook so Resume doesn't crash
vi.mock("../contexts/AuthContext", () => ({
useAuth: () => ({ user: null }),
}))

// Mock supabase client so upload effect doesn't actually run against real backend
vi.mock("../lib/supabaseClient", () => ({
supabase: {
    storage: {
    from: () => ({
        upload: vi.fn(),
        createSignedUrl: vi.fn(),
    }),
    },
    from: () => ({
    upsert: vi.fn(),
    }),
},
}))

// Helper to render Resume with a Router wrapper
const renderResume = () =>
render(
    <MemoryRouter>
    <Resume />
    </MemoryRouter>
)

describe("Resume Page", () => {
test("renders the hero headline", () => {
    renderResume()
    expect(
    screen.getByText("Polish your resume with AI powered guidance.")
    ).toBeInTheDocument()
})

test("shows the Upload new resume button", () => {
    renderResume()
    expect(
    screen.getByRole("button", { name: /Upload new resume/i })
    ).toBeInTheDocument()
})

test("shows the View Feedback on your resume link", () => {
    renderResume()
    expect(
    screen.getByRole("link", { name: /View Feedback on your resume/i })
    ).toBeInTheDocument()
})

test("shows the Resume upgrades in minutes section heading", () => {
    renderResume()
    expect(
    screen.getByRole("heading", { name: /Resume upgrades in minutes/i })
    ).toBeInTheDocument()
})

test("shows the Made for confident submissions section", () => {
    renderResume()
    expect(
    screen.getByRole("heading", { name: /Made for confident submissions/i })
    ).toBeInTheDocument()
})

test("shows loading preview text initially", () => {
    renderResume()
    expect(
    screen.getByText(/Pulling the latest resume updates/i)
    ).toBeInTheDocument()
})
})

import { ViewPanel } from "@tolokoban/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ViewPanel color="neutral-1" fullsize margin={0}>
            {children}
        </ViewPanel>
    )
}

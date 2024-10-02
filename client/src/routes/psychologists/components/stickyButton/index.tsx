import { Button } from "@/components/ui"

export const StickyButton = () => {
    return (
        <div className="hidden lg:flex px-10 items-center justify-center sticky top-48 right-0 rounded-xl">
        <Button className="rounded-full py-4 w-full" color="" variant="small">
          Book a consultation
        </Button>
      </div>
    )
}
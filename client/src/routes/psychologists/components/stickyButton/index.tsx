import { Button } from "@/components/ui"

export const StickyButton = () => {
    return (
        <div className="hidden lg:flex py-5 px-10 items-center justify-center sticky top-48 right-0 bg-white rounded-xl shadow-sm shadow-gray-100">
        <Button className="rounded-full py-4 w-full" color="" variant="medium">
          Book a consultation
        </Button>
      </div>
    )
}
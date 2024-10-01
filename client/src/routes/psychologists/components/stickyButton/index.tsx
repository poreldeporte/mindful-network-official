import { Button } from "@/components/ui"

export const StickyButton = () => {
    return (
        <div className="hidden lg:flex py-5 px-20 items-center justify-center sticky top-48 right-0 bg-white rounded-xl shadow-sm shadow-gray-100">
        <Button className="rounded-full py-2 w-full" color="" variant="large">
          Book a consultation
        </Button>
      </div>
    )
}
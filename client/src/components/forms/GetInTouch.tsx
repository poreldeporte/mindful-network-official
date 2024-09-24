import { Typography } from "../ui";
import { Button } from "../ui";

export function GetInTouch() {
  return (
    <section className="page-width my-20">
      <div className="bg-orange-100 p-5">
        <div>
          <Typography className="mb-2" color="black" as="h2" variant="xlarge">
            Get in Touch
          </Typography>
          <Typography
            className="mb-10"
            color="darkGray"
            as="h2"
            variant="medium"
          >
            We're Here to Help—Reach Out with Your Questions or Concerns
          </Typography>
        </div>
        <div className="flex flex-col items-end">
          <form className="w-full flex flex-col gap-5">
            <input
              className="bg-transparent w-auto p-2 border-b-2 border-gray-300"
              type="text"
              placeholder="Full Name"
            ></input>
            <input
              className="bg-transparent w-auto p-2 border-b-2 border-gray-300"
              type="text"
              placeholder="Email"
            ></input>
            <input
              className="bg-transparent w-auto p-2 border-b-2 border-gray-300"
              type="text"
              placeholder="Phone"
            ></input>
            <textarea
              className="bg-transparent w-auto p-2 border-b-2 border-gray-300"
              placeholder="Your message"
            ></textarea>
          </form>
          <Button className="p-2 mt-10 rounded-full w-auto" variant="medium">Send Message</Button>
        </div>
      </div>
    </section>
  );
}

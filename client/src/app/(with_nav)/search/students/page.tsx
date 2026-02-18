import { redirect } from "next/navigation";

export default function LegacyStudentSearchRedirect() {
	redirect("/students/search");
}

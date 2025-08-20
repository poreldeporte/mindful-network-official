"use client";
import { FileUpload } from "@/components/shared";
import { useState } from "react";
import { PsychologistModel } from "@/models";
import { Button } from "@/components/ui";
import * as XLSX from "xlsx";

export function FileUploadContainer() {
	const [file, setFile] = useState<File | null>(null);
	const [parsedData, setParsedData] = useState<PsychologistModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const parseXlsxFile = (selectedFile: File) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = e.target?.result;
			const workbook = XLSX.read(data, { type: "binary" });
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet);

			const transformedData: PsychologistModel[] = jsonData.map(
				(item: any) => ({
					...item,
					name: item["Name"],
					facility: item["Facility"],
					address: item["Address"],
					phone: item["Phone"],
					image: item["Image"] || "",
					insurances: item["Insurances"] ? item["Insurances"] : "",
					ageSpecialty: item["Age Specialty"] ? item["Age Specialty"] : "",
					conditionSpecialty: item["Condition Specialty"]
						? item["Condition Specialty"]
						: "",
					therapyOptions: item["Therapy Options"]
						? item["Therapy Options"]
						: "",
				})
			);

			setParsedData(transformedData);
		};
		reader.onerror = (error) => console.error("Error parsing file:", error);
		reader.readAsBinaryString(selectedFile);
	};

	const handleFileUpload = (selectedFile: File | null) => {
		if (selectedFile) {
			setFile(selectedFile);
			parseXlsxFile(selectedFile);
		} else {
			setFile(null);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		setErrorMessage(null);
		setSuccessMessage(null);
		console.log(parsedData);

		try {
			if (parsedData.length > 0) {
				const response = await fetch("/api/resources/psychologists", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(parsedData),
				});

				if (!response.ok) {
					const errorData = await response.json();
					setErrorMessage(`Error: ${errorData.error}`);
				} else {
					const result = await response.json();
					setSuccessMessage(
						`Successfully created ${result.successfulCreations.length} psychologists. ${result.failedCreations.length} failed.`
					);
				}
			} else {
				setErrorMessage("No parsed data to submit");
			}
		} catch (error) {
			console.error("Submission error:", error);
			setErrorMessage("An error occurred while submitting the data");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="w-full min-h-96 border border-dashed bg-white border-orange-200 rounded-lg p-6">
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<FileUpload accept=".xlsx" onChange={handleFileUpload} />

				<div className="mt-4">
					{file && (
						<>
							<p>Selected File:</p>
							<ul>
								<li>{file.name}</li>
							</ul>
						</>
					)}
				</div>

				<div className="mt-4">
					<Button
						variant="bodySmall"
						type="submit"
						isLoading={isLoading}
						disabled={!file}
						className={`ml-4 px-4 py-2 text-white rounded-lg transition`}
					>
						Submit
					</Button>
				</div>
				{errorMessage && <p className="text-orange-500 mt-4">{errorMessage}</p>}
				{successMessage && (
					<p className="text-green-500 mt-4">{successMessage}</p>
				)}
			</form>
		</section>
	);
}

import React from "react";

const NotFoundPage = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-blue-50">
			<div className="text-center">
				<h1 className="text-5xl font-bold text-blue-900">404</h1>
				<p className="text-xl text-blue-700">
					Oops! The page you're looking for doesn't exist.
				</p>
				<a
					href="/"
					className="text-orange-500 hover:text-orange-700 mt-6 inline-block underline underline-offset-4"
				>
					Return to Home
				</a>
			</div>
		</div>
	);
};

export default NotFoundPage;

import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function Not_found() {
	const error = useRouteError();
	let errorMessage = "";

	if (isRouteErrorResponse(error)) {
		errorMessage = error.error?.message || error.statusText;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		errorMessage = 'Unknown error';
	}
	console.error(error);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{errorMessage}</i>
			</p>
		</div>
	);
}




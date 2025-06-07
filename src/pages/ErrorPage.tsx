import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops!</h1>
                    <h2 className="text-lg text-gray-600 mb-8">Something went wrong</h2>
                    <p className="text-gray-500 mb-8">{errorMessage}</p>
                </div>
                <div>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    );
}

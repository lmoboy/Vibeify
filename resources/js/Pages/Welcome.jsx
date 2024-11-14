import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-dark">
                <header className="fixed top-0 z-10 w-full bg-dark-darker/80 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/">
                                    <svg
                                        className="h-12 w-auto text-primary"
                                        viewBox="0 0 70 70"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.3025 0C12.7647 0 14.0139 1.05421 14.2598 2.49564L21.2575 43.5268C21.7492 46.4098 25.6544 46.957 26.9196 44.3202L47.3683 1.70221C47.8675 0.661845 48.9191 0 50.0731 0H58.995C60.072 0 61.0664 0.577366 61.6004 1.51274L67.4385 11.74C68.5802 13.74 67.136 16.2273 64.8331 16.2273H55.0137C53.8765 16.2273 52.8371 16.8702 52.3293 17.8878L27.1539 68.3395C26.6462 69.357 25.6068 70 24.4696 70H16.2993C14.8667 70 13.634 68.9871 13.3562 67.5816L0.707841 3.58164C0.341339 1.72716 1.76057 0 3.65092 0H11.3025Z"
                                            fill="currentColor"
                                        />
                                        <rect x="52.3158" y="22.4318" width="17.6842" height="10.5" rx="5.25"
                                            fill="currentColor"/>
                                    </svg>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-primary px-4 py-2 text-dark font-semibold transition-colors hover:bg-primary-dark"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-300 transition-colors hover:text-primary"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-primary px-4 py-2 text-dark font-semibold transition-colors hover:bg-primary-dark"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
                            Welcome to Vibeify
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Discover music that matches your mood. Using AI-powered emotion detection,
                            we create the perfect playlist for how you're feeling.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-primary px-6 py-3 text-lg text-dark font-semibold transition-colors hover:bg-primary-dark"
                                >
                                    Get Started
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-primary px-6 py-3 text-lg text-dark font-semibold transition-colors hover:bg-primary-dark"
                                >
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

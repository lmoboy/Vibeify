import {Head, Link} from '@inertiajs/react';

export default function Welcome({auth, laravelVersion, phpVersion}) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (<>
        <Head title="Welcome"/>
        <div className="bg-gray-500 text-black/50 dark:bg-[#181818] dark:text-white/50">
            {/*<img*/}
            {/*    id="background"*/}
            {/*    className="absolute right-20 bottom-0 max-w-[877px]"*/}
            {/*    src="/background.png"*/}
            {/*/>*/}
            <div
                className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                <header
                    className="fixed top-0 z-10 flex w-full items-center gap-2 py-10 backdrop-blur-md bg-[#181818] dark:text-white">
                    <div className="flex absolute left-[10px]">
                        <a
                            href="/"
                        >
                            <svg
                                className="h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]"
                                viewBox="0 0 70 70"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.3025 0C12.7647 0 14.0139 1.05421 14.2598 2.49564L21.2575 43.5268C21.7492 46.4098 25.6544 46.957 26.9196 44.3202L47.3683 1.70221C47.8675 0.661845 48.9191 0 50.0731 0H58.995C60.072 0 61.0664 0.577366 61.6004 1.51274L67.4385 11.74C68.5802 13.74 67.136 16.2273 64.8331 16.2273H55.0137C53.8765 16.2273 52.8371 16.8702 52.3293 17.8878L27.1539 68.3395C26.6462 69.357 25.6068 70 24.4696 70H16.2993C14.8667 70 13.634 68.9871 13.3562 67.5816L0.707841 3.58164C0.341339 1.72716 1.76057 0 3.65092 0H11.3025Z"
                                    fill="#6AE06A"
                                />
                                <rect x="52.3158" y="22.4318" width="17.6842" height="10.5" rx="5.25"
                                      fill="#6AE06A"/>
                                <rect x="45.8597" y="37.7045" width="21.3333" height="10.5" rx="5.25"
                                      fill="#6AE06A"/>
                                <rect x="39.6842" y="52.9773" width="24.1403" height="10.5" rx="5.25"
                                      fill="#6AE06A"/>
                            </svg>
                        </a>
                    </div>
                    <nav className="-mx-3 left-0 flex flex-1 justify-center">
                        {auth.user ? <>
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Check your vibes
                            </Link>
                            <span
                                className="inline-block bg-white mt-3 mx-[4px] h-[18px] w-[1px] align-bottom"></span>
                            <Link
                                href={route('profile.edit')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"

                            >Settings</Link>
                        </> : <>
                            <Link
                                href={route('login')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <span
                                className="inline-block bg-white mt-3 mx-[4px] h-[18px] w-[1px] align-bottom"></span>
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>}
                    </nav>

                </header>

                <main className="mt-6">
                    <div className="fixed left-[250px] top-[300px] justify-center ">
                        <h1 style={{userSelect: 'none'}}
                            className="text-center text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
                            GET YOUR MOOD RIGHT
                        </h1>
                        <h1 style={{
                            userSelect: 'none', position: 'absolute', left: '14px', top: '-3px', zIndex: -1
                        }}
                            className="text-center text-4xl font-bold tracking-tight text-[#34C759] dark:text-[#34C759] sm:text-6xl">
                            GET YOUR MOOD RIGHT
                        </h1>
                        <span className="inline-block bg-white mt-3 mx-[4px] h-[1px] w-[691px] align-bottom"></span>
                        <p className=" mt-6 text-center text-3xl text-black dark:text-white w-[700px]">
                            Using our innovative ai technologies and simple to use design you can get a
                            recommendation that will fit your mood in a matter of seconds
                        </p>
                        <div className="flex justify-center">
                            {auth.user ?
                                <Link
                                    href={route('dashboard')}
                                    className="block shadow-md hover:shadow-[-7px_-7px_0_#6AE06A] hover:box-decoration-clone rounded-xl p-4 transition bg-black mt-8 text-center text-3xl text-black dark:text-white w-[450px]"
                                >
                                    Check your vibes
                                </Link> :
                                <Link
                                    href={route('register')}
                                    className="block shadow-md hover:shadow-[-7px_-7px_0_#6AE06A] hover:box-decoration-clone rounded-xl p-4 transition bg-black mt-8 text-center text-3xl text-black dark:text-white w-[450px]"
                                >
                                    Try it for free!
                                </Link>}
                        </div>

                    </div>
                </main>

                <footer className="absolute py-16 text-center bottom-0 text-sm text-black dark:text-white/70">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>

            </div>
        </div>
    </>);
}

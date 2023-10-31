import LanguageSwitcher from "./LanguageSwitches";
import "./banner.css"

const Banner = () => {

    return (
        <header className="bg-sunwing-orange h-[155px] flex items-center">
            <div className="banner-content flex flex-col px-3 w-full lg:flex-row lg:items-center lg:px-4 mx-auto max-w-[1140px]">
                <div className="logo-container pr-10">
                    <a href="https://www.sunwing.ca/en/promotion/flights/cheap-flights">
                        <img className="max- max-w max-h-[50px]" src="/public/sungwing-logo-white.webp" alt="Sungwing Airlines Logo" />
                    </a>
                </div>
                <nav className="mt-[10px] flex flex-col gap-1 md:flex-row justify-between w-full">
                    <ul className="flex flex-row gap-10">
                        <li><a className="text-white hover:underline text-lg font-normal font-ptsans" href="/en/promotion/packages/all-inclusive-vacation-packages">Packages</a></li>
                        <li><a className="text-white hover:underline text-lg font-normal font-ptsans" href="/en/promotion/flights/cheap-flights">Flights</a></li>
                        <li><a className="text-white hover:underline text-lg font-normal font-ptsans" href="/en/hotel/cheap-hotel-deals">Hotels</a></li>
                        <li><a className="text-white hover:underline text-lg font-normal font-ptsans" href="/en/cruise-travel">Cruises</a></li>
                    </ul>
                    <LanguageSwitcher />
                </nav>

            </div>
        </header>
    )
}


export default Banner;
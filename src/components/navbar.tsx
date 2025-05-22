import logo from "../assets/logo.png";
// import { CiSearch } from "react-icons/ci";

export function Navbar() {
  return (
    <nav className="flex h-24 m-auto w-full fixed flex-row z-30 bg-white">
      <div className="flex justify-between items-center w-full px-12 py -5">
        {/* Logo container */}
        <div className="h-14 flex items-center mr-4">
          <div className="h-full flex items-center overflow-hidden">
            <img
              src={logo}
              alt="Balancee"
              className="h-auto max-w-full max-h-full"
            />
          </div>
        </div>

        {/* Search bar container - flexible width */}
        {/* <div className="flex-grow flex justify-center">
          <div className="flex items-center h-10 w-full max-w-md">
            <div className="w-full flex border-2 gap-2 items-center border-[#0870A7] rounded-md px-2 py-1">
              <div>
                <CiSearch className="text-primary-blue " />
              </div>
              <div>
                <input
                  type="search"
                  placeholder="Search for station"
                  className="focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div> */}

        <div className="h-14 ml-4 flex items-center"></div>
      </div>
    </nav>
  );
}

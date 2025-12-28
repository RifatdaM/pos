import Customers from "./components/customers";
import Products from "./components/products";
import Searching from "./components/Searching";
import Summary from "./components/summary";
import Topbar from "./components/topbar";
import "./index.css";

function App() {
  return (
    <>
      <Topbar /> {/* Main part */}
      <main className="container mx-auto p-4 xl:p-0">
        {/* Navbar */}

        {/* Left side */}
        <div className="flex  flex-wrap">
          <div className=" py-4 w-full  lg:w-7/12 pr-4">
            <Searching />

            {/* Empty product area */}
            <Products />
          </div>

          <div className="w-full lg:w-5/12 mt-5">
            <div className="border border-gray-400 rounded flex flex-col min-h-[calc(100vh-112px)] ">
              <Customers />

              {/* Empty cart area */}
              <div className="p-4 flex-1  overflow-y-auto">
                <p>Empty cart area here</p>
              </div>

              <Summary />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

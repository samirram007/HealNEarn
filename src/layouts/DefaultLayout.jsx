import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Footer } from "@/modules/Landing";
import ManagerContextProvider from "@/modules/Manager/context/ManagerContextProvider";
import MemberContextProvider from "@/modules/Member/context/MemberContextProvider";
import { useState } from "react";
import { Outlet } from "react-router";

const DefaultLayout = () => {

    // console.log("DefaultLayout context", context);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden ">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">


                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main className="">
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                <ManagerContextProvider>

                                    <MemberContextProvider>

                                        <Outlet />
                                    </MemberContextProvider>
                                </ManagerContextProvider>

                            </div>
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}
                        <Footer />
                    </div>
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    );
}

export default DefaultLayout
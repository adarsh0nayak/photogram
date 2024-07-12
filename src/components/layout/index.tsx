import { SideBar } from "../sidebar";
import { UserList } from "../userList";

export interface ILayoutProps {
    children: React.ReactNode
}

export function Layout({children} : Readonly<ILayoutProps>) {
  return (
    <div className="flex bg-white">
      <aside className="flex gap-x-4 bg-gray-800 fixed top-0 left-0 z-40 lg:w-60 h-full">
        <SideBar />
      </aside>
      <div className="lg:ml-60 lg:mr-60 p-8 flex-1 ml-36">{children}</div>
      <aside className="hidden lg:block gap-x-4 bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-full">
        <UserList/>
      </aside>
    </div>
  );
}

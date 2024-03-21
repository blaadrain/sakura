import AccountContent from "./components/AccountContent";
import Header from "@/components/Header";

const Account = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto bg-neutral-900 md:rounded-lg">
      <Header>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold">Account settings</h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;

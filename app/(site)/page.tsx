import getSongs from "@/actions/getSongs";
import PageContent from "./components/PageContent";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto bg-neutral-900 md:rounded-lg">
      <Header>
        <div className="mb-4">
          <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ListItem
              img="/images/liked.png"
              name="Favorite Songs"
              href="/favorite"
            />
          </div>
        </div>
      </Header>
      <div className="mb-7 mt-2 px-6">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            Newest songs
          </h2>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}

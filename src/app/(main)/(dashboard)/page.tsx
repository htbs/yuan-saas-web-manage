export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-full flex-col overflow-y-auto bg-white">
        <div className="container mx-auto flex flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-bold">
            Welcome to <span className="text-blue-500">HeroUI</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

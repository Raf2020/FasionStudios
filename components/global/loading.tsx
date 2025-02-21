const Loading = ({ label }: { label?: string }) => (
  <div className="z-40 fixed top-0 left-0 flex w-screen h-screen px-4 items-center justify-center bg-black bg-opacity-50">
    <div className="text-white text-2xl font-bold">
      {label ?? "Saving Data ..."}
    </div>
  </div>
);

export default Loading;

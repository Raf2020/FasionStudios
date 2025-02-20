import PrimaryButton from "./elements/primary-button";

type AlertProps = {
  title: string;
  message: string;
  onClose: () => void;
};

const Alert = ({ title, message, onClose }: AlertProps) => {
  return (
    <div className="z-50 fixed top-0 left-0 flex w-screen h-screen px-4 items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-96 px-6 sm:px-8 py-6 flex-col gap-3 rounded-lg border-gray-100 bg-white shadow-md">
        <p className="text-xl font-bold">{title}</p>
        <p className="w-full text-md text-gray-700">{message}</p>
        <div className="self-end">
          <PrimaryButton name="OK" lowHeight onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Alert;

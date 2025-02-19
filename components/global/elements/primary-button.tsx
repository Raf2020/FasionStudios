const PrimaryButton = ({
  name,
  fullWidth,
}: {
  name: string;
  fullWidth?: boolean;
}) => {
  return (
    <div
      className="py-5 px-12 rounded-full bg-primary-blue cursor-pointer"
      style={{
        width: fullWidth ? "100%" : "fit-content",
      }}
    >
      <p className="text-center text-primary-purple text-xl font-semibold">
        {name}
      </p>
    </div>
  );
};

export default PrimaryButton;

const PrimaryButton = ({
  name,
  fullWidth,
  lowHeight,
  disabled,
  onClick,
}: {
  name: string;
  fullWidth?: boolean;
  lowHeight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className="py-4 sm:py-5 px-12 rounded-full bg-primary-blue cursor-pointer"
      style={{
        width: fullWidth ? "100%" : "fit-content",
        paddingTop: lowHeight ? "8px" : undefined,
        paddingBottom: lowHeight ? "8px" : undefined,
        opacity: disabled ? 0.7 : undefined,
        cursor: disabled ? "not-allowed" : undefined,
      }}
      onClick={disabled ? undefined : onClick}
    >
      <p className="text-center text-primary-purple text-lg sm:text-xl font-semibold">
        {name}
      </p>
    </div>
  );
};

export default PrimaryButton;

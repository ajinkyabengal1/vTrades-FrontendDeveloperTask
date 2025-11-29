interface StatusModalProps {
  icon?: "mail" | "success";
  title: string;
  message: string;
  buttonLabel?: string;
  onClose: () => void;
}

export function StatusModal({
  icon = "success",
  title,
  message,
  buttonLabel = "Okay",
  onClose,
}: StatusModalProps) {
  const isMail = icon === "mail";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
      {/* Modal Box */}
      <div
        className="bg-[#181824] rounded-[10px] w-full max-w-[500px]
                   shadow-xl text-center flex flex-col
                   px-6 py-8 sm:px-10"
      >
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-[72px] w-[72px] sm:h-[100px] sm:w-[100px] items-center justify-center rounded-full bg-[#1D9200]">
          <span className="material-symbols-outlined text-[49px]! ">
            {isMail ? "mail" : "verified"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[18px] sm:text-[20px] leading-[150%] tracking-[-0.03em] font-semibold mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm leading-[150%] text-[#DADADA] mb-8 px-2 sm:px-0">
          {message}
        </p>

        {/* Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-[116px] h-[50px] rounded-[10px] bg-[#8854C0] pl-[40px] pr-[30px] flex items-center justify-center gap-[10px] text-sm font-semibold hover:bg-[#7a4ab0] transition"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

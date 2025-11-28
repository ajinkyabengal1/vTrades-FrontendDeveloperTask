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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
      <div className="bg-[#181824] rounded-2xl px-10 py-8 max-w-sm w-full text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
           <span className="material-symbols-outlined text-2xl">{isMail ? "mail" : "verified"}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="rounded-md bg-purple-600 px-6 py-2 text-sm font-semibold hover:bg-purple-700"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

interface ViewToggleProps {
  currentView: "list" | "card";
  onToggle: (view: "list" | "card") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onToggle }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onToggle("list")}
        className={`p-2 rounded ${
          currentView === "list"
            ? "bg-primary-light text-white"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <ListBulletIcon className="h-6 w-6" />
      </button>
      <button
        onClick={() => onToggle("card")}
        className={`p-2 rounded ${
          currentView === "card"
            ? "bg-primary-light text-white"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <Squares2X2Icon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ViewToggle;

import { Plus } from "lucide-react";
import { FC } from "react";
import ActionTooltip from "@/components/custom/common/action-tooltip";
import CreateServerModal from "../modals/create-server-modal";

interface NavigationActionProps {}

const NavigationAction: FC<NavigationActionProps> = ({}) => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <CreateServerModal>
          <button className="group flex items-center">
            <div
              className="
                mx-3 h-12 w-12
                flex items-center justify-center
                rounded-3xl group-hover:rounded-2xl
                bg-background dark:bg-neutral-700 group-hover:bg-emerald-500
                transition-all overflow-hidden
            "
            >
              <Plus
                size={25}
                className="text-emerald-500 transition group-hover:text-white"
              />
            </div>
          </button>
        </CreateServerModal>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;

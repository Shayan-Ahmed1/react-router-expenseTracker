// RRD Imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper function
import { deleteItem } from "../helper";

const logoutAction = async () => {
  // delete the user
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });

  toast.success("You've logged out!");

  // redirect to homepage
  return redirect("/");
};

export default logoutAction;

import { useNavigate } from "react-router";
import { ErrorNotification } from "../components";

export const Error404Page = () => {
  const navigate = useNavigate();

  return (
    <ErrorNotification
      title="404"
      description="The page was not found"
      onClose={() => navigate("/")}
    />
  );
};

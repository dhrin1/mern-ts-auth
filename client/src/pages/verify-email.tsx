import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";

export type VerificationParams = {
  code: string | undefined;
};

export const VerifyEmail = () => {
  const { code } = useParams();
  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => {
      if (!code) return;
      return verifyEmail(code);
    },
    enabled: !!code,
  });
  return (
    <div className="size-screen">
      <div className="grid">
        {isPending ? (
          <label>Loading...</label>
        ) : (
          isSuccess && <div>Email successfully verified</div>
        )}
        {isError && (
          <div>
            <h2>Failed to verified</h2>
            <p>
              The link is either invalid or expired.{" "}
              <Link to="/forgot/password">Get a new link</Link>{" "}
            </p>
          </div>
        )}
        <Link type="button" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
};

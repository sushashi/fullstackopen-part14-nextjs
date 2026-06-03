import { generateToken } from "../actions/users";
import { getCurrentUser } from "../services/session";

type User = Awaited<ReturnType<typeof getCurrentUser>>

const API = ({ currentUser }: { currentUser: User}) => {
  if (!currentUser) return null;

  const generateTokenUsername = generateToken.bind(null, currentUser.username);
  return (
    <div data-testid="api-token-section" className="border rounded border-blue-100 shadow hover:bg-blue-50/50 p-3 my-2">
      <h3>API Token</h3>
      <form action={generateTokenUsername}>
        <div className="border bg-white rounded border-blue-100 p-2 m-2">
          <label>Current Token</label>
          <p data-testid="api-token" className="rounded text-center p-1 m-3 bg-blue-100">
            {currentUser.token ? <span data-testid="token-display">{currentUser.token}</span> : <span data-testid="no-token-message">No Token</span>}
          </p>
        </div>
        <button data-testid="generate-token-button" className="btn" type="submit">Generate New Token</button>
      </form>
    </div>
  );
};

export default API;
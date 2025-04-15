// pages/admin/blocked.js
export default function Blocked() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Access Blocked</h1>
          <p className="text-lg mt-2">Your account has been blocked. Please contact support.</p>
        </div>
      </div>
    );
  }
  
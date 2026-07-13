"use client";

export function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Delete this item? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="focus-ring text-sm text-red-400 hover:text-red-300"
    >
      Delete
    </button>
  );
}
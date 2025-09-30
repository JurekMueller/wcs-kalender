import { cronAction } from "@/app/server/data/cron-action";

export function UpdateDataButton() {
  return (
    <form action={cronAction}>
      <button
        type="submit"
        className="cursor-pointer rounded bg-blue-700 px-2 py-1 font-bold text-white
          hover:bg-blue-500"
      >
        Fetch data
      </button>
    </form>
  );
}

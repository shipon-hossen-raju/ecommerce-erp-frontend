import { Empty } from "antd";

export default function NoDataFount({text}: {text?: string}) {
  return (
    <div className="flex items-center justify-center h-60 mt-10 w-full">
      <Empty description={`${text ?? "No Data Found!"}`} />
    </div>
  );
}

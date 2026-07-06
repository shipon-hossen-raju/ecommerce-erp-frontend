import type { IParam } from "../../types/global.type";

export default function paramsGenerate(args: IParam[]) {
  const params = new URLSearchParams();

  if (args !== undefined && args.length > 0) {
    args.forEach((item: IParam) => {
      if (item.value) {
        params.append(item.name, item.value);
      }
    });
  }

  return params;
}

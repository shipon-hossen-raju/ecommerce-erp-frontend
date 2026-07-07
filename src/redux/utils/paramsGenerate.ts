import type { IParam } from "../../types/global.type";

// Build URLSearchParams from a list of name/value filter params, skipping empty values
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

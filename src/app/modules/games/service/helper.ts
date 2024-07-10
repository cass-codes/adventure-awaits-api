export function parseSavePath(savePath: string) {
  const pathParts = savePath.split(".");
  const ObjectName: string = pathParts[0];
  const propertyPath: string[] = pathParts.slice(1);
  return { ObjectName, propertyPath };
}

export function evalPlusMinusInput(input: string) {
  if (input === "++") {
    return 1;
  } else if (input === "--") {
    return -1;
  } else {
    const num = parseFloat(input);
    if (!isNaN(num)) {
      return num;
    }
    throw Error(`Invalid input: ${input}`);
  }
}

type IObject = {
  [key: string]: any;
};
export const removePassword = (data: IObject): IObject => {
  const obj = {};
  Object.keys(data).forEach((key) => {
    key !== 'password';
    obj[key] = data[key];
  });

  return obj;
};

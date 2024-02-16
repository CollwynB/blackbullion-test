function paginate(arr: any[], pageSize: number = 9): any[][] {
  const pages = [];
  for (let i = 0; i < arr.length; i += pageSize) {
    pages.push([...arr].slice(i, i + pageSize));
  }
  if (pages.length === 0) pages.push([]);
  return pages;
}

export { paginate };

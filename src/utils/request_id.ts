const base = 'http://host';

export const buildIdParser = (filterId: (id: string) => boolean) => {
  const splitId = (id: string) => {
    const [filename, rawQuery] = id.split('?', 2);
    return { filename, rawQuery: rawQuery || '' };
  };
  return (id: string) => {
    const { filename, rawQuery } = splitId(id);
    if (filterId(filename)) {
      return { id, filename, rawQuery };
    }
  };
};

export const normalizeId = (baseId: string, id: string) => {
  const normalizedPath = new URL(id, new URL(baseId, base)).href;
  return normalizedPath.replace(base, '');
};

export const removeQueryParams = (url: string) => {
  const parsedUrl = new URL(url, base);
  parsedUrl.search = '';
  return parsedUrl.toString().replace(base, '');
};

export const appendQueryParam = (url: string, param: string, value: string) => {
  const parsedUrl = new URL(url, base);
  parsedUrl.searchParams.set(param, value);
  return parsedUrl.toString().replace(base, '');
};

export const getQueryParam = (query: string, param: string) => {
  const urlParams = new URLSearchParams(query);
  return urlParams.has(param) ? urlParams.get(param) : null;
};

export const getVirtualRawQuery = (id: string) => {
  return new URL(id.replace('\0', '')).search;
};

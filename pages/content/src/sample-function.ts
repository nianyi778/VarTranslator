const sampleFunction = () => {
  console.log('content script - sampleFunction() called from another module');
};

const toCamelCase = (text: string): string =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join('');

export { sampleFunction, toCamelCase };

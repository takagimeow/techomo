import ReactMde, { Suggestion } from 'react-mde';

export async function* save(data: any) {
  // Promise that waits for "time" milliseconds
  const wait = function (time: number) {
    return new Promise<void>((a, r) => {
      setTimeout(() => a(), time);
    });
  };

  // Upload "data" to your server
  // Use XMLHttpRequest.send to send a FormData object containing
  // "data"
  // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

  await wait(2000).then(() => console.log('HELLO WORLD!!! YES'));
  // yields the URL that should be inserted in the markdown
  yield 'https://picsum.photos/300';
  await wait(2000);

  // returns true meaning that the save was successful
  return true;
}

export function loadSuggestions(text: any): Promise<Suggestion[]> {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: 'Andre',
          value: '@andre',
        },
        {
          preview: 'Angela',
          value: '@angela',
        },
        {
          preview: 'David',
          value: '@david',
        },
        {
          preview: 'Louise',
          value: '@louise',
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
}

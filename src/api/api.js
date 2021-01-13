import superagent from 'superagent';

export function getAllImages() {
return superagent
  .get('https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json')
}

const fs = require('fs');

const path = './wedding-site/src/components/Entourage.jsx';
let content = fs.readFileSync(path, 'utf8');

const splitNameComponent = `
function SplitName({ children }) {
  if (typeof children !== 'string') return children
  const chars = children.split('')
  return (
    <span className="split-text" aria-label={children}>
      <span className="split-text__inner" aria-hidden="true">
        {chars.map((char, i) => (
          <span key={i} className="char char--base" style={{ '--char-index': i }}>
            {char === ' ' ? '\\u00A0' : char}
          </span>
        ))}
      </span>
      <span className="split-text__inner split-text__inner--hover" aria-hidden="true">
        {chars.map((char, i) => (
          <span key={i} className="char char--hover" style={{ '--char-index': i }}>
            {char === ' ' ? '\\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  )
}
`;

// Insert the component after imports
content = content.replace(/(import '.\/Entourage.css'\n)/, `$1\n${splitNameComponent}\n`);

// Replace names
content = content.replace(/<div className="entourage__name">(.*?)<\/div>/g, '<div className="entourage__name"><SplitName>$1</SplitName></div>');

fs.writeFileSync(path, content, 'utf8');
console.log('Updated Entourage.jsx successfully');

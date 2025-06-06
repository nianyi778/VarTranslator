const styles = ['Camel Case', 'Kebab Case', 'Snake Case', 'Pascal Case', 'Upper Case', 'Lower Case'];
export default function Translator() {
  return (
    <div className="h-full overflow-y-auto">
      {styles.map(style => (
        <div key={style}>
          <div className="font-bold">{style}</div>
          <div>
            <code>copiedText</code>
          </div>
        </div>
      ))}
    </div>
  );
}

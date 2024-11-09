
// client/src/components/Tables/DataTable.js
const DataTable = ({ data, onDelete, onEdit }) => (
    <table>
      <thead>
        <tr>
          {data[0] && Object.keys(data[0]).map(key => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {Object.values(item).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
            <td>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
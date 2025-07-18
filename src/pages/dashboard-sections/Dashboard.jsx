import CreateButton from "../../components/CreateButton";

function Dashboard() {
  function table() {
    return (
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Client Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <CreateButton />
      <h3>Tickets</h3>
      <div className="table-container">
        <table>{table()}</table>
      </div>
    </div>
  );
}

export default Dashboard;

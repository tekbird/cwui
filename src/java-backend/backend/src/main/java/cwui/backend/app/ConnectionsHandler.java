package cwui.backend.app;

import javax.json.bind.JsonbBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.datastax.driver.core.*;

import cwui.backend.models.Connection;
import cwui.backend.models.ConnectionTestResponse;

@Path("connections")
public class ConnectionsHandler {

	@Path("test")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ConnectionTestResponse testConnection(Connection connection) {
		Cluster cluster = null;
		try {
			cluster = Cluster.builder()
					.withPort(connection.getPort())
					.addContactPoint(connection.getHost()).build();
			Session session = cluster.connect(); // (2)

			ResultSet rs = session.execute("select release_version from system.local"); // (3)
			Row row = rs.one();
			ConnectionTestResponse response = new ConnectionTestResponse();
			response.setSuccess(true);
			response.setVersion(row.getString("release_version"));
			return response;
		}
		catch(Exception ex) {
			ConnectionTestResponse response = new ConnectionTestResponse();
			response.setSuccess(false);
			return response;
		}
		finally {
			if (cluster != null)
				cluster.close(); // (5)
		}
	}
}

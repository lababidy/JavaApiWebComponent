package org.javaapiwebcomponent;

import javax.annotation.sql.DataSourceDefinition;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * Configures JAX-RS for the application.
 * @author Juneau
 */
@DataSourceDefinition(
		name = "java:comp/inst/hpg",
		//		className = "org.mariadb.jdbc.MariaDbDataSource",
		className = "org.mariadb.jdbc.MariaDbPoolDataSource",
		//		className = "com.mysql.cj.jdbc.MysqlDataSource",
		url = "jdbc:mysql://127.0.0.1:3306/course"
		+ "?characterEncoding=utf-8&zeroDateTimeBehavior=CONVERT_TO_NULL&user=root&password=000000&autoReconnect=true&failOverReadOnly=false&maxReconnects=10&useSSL=false",
		//        url = "jdbc:mysql://127.0.0.1:3306/institutejpa?characterEncoding=utf-8&zeroDateTimeBehavior=CONVERT_TO_NULL&user=root&password=000000&autoReconnect=true&failOverReadOnly=false&maxReconnects=10",
		        initialPoolSize = 1,
		maxPoolSize = 8,
		databaseName = "course",
		serverName = "127.0.0.1",
		user = "root",
		password = "000000",
		portNumber = 3306,
		properties = {"characterEncoding=utf-8",
			"zeroDateTimeBehavior=CONVERT_TO_NULL",
			//        "autoReconnect=true",
			"failOverReadOnly=false",
			//        "maxReconnects=10",
			"useSSL=false",
			"serverTimezone=UTC",})
@ApplicationPath("api")
public class JAXRSConfiguration extends Application {
    
}

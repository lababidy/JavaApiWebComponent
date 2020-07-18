package org.javaapiwebcomponent.resources;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.inject.Named;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


/**
* @author Mohannad Lababidi
*/
@Named("CourseDao")
@javax.inject.Singleton
public class CourseDao {

@Resource(lookup = "java:comp/inst/hpg")
	DataSource conn;
	
private static int counter = 0;


    public Response findAll(int limit,int offset) {
    Connection c = null;

    List<Course> list = new ArrayList<Course>();
	Map<String, Object> map = new HashMap<String, Object>();
    String sql = "SELECT cid,cname, cnotes FROM course LIMIT ? OFFSET ?;"; // ORDER BY
        try {
        c = conn.getConnection();
        PreparedStatement s = c.prepareStatement(sql);
			s.setInt(1, limit);
			s.setInt(2, offset);
			ResultSet rs = s.executeQuery();
        while (rs.next()) {
        list.add(processRow(rs));
           }
		map.put("user", "");
		map.put("data", list);
        c.close();
        } catch (SQLException e) {
        Logger.getLogger(CourseDao.class.getName()).severe(()-> "CourseDao.findAll " + e.getMessage());
		return Response.status(Response.Status.BAD_REQUEST)
					.entity("{\"error\":\"" + e.getMessage() + "\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();
        } 
        return Response.status(Response.Status.OK)
				.entity(map)
				.type(MediaType.APPLICATION_JSON)
				.build();
        }
        
         public Response findByName(String name,int limit,int offset) {
    Connection c = null;

    List<Course> list = new ArrayList<Course>();
	Map<String, Object> map = new HashMap<String, Object>();
    String sql = "SELECT cid,cname, cnotes FROM course WHERE cname like ? || cnotes like ? LIMIT ? OFFSET ?;"; // ORDER BY
        try {
        c = conn.getConnection();
       PreparedStatement s = c.prepareStatement(sql);
			s.setString(1, "%" + name + "%");
			s.setString(2, "%" + name + "%");
			s.setInt(3, limit);
			s.setInt(4, offset);
			ResultSet rs = s.executeQuery();
        while (rs.next()) {
        list.add(processRow(rs));
           }
		map.put("user", "");
		map.put("data", list);
        c.close();
        } catch (SQLException e) {
        Logger.getLogger(CourseDao.class.getName()).severe(()-> "CourseDao.findByName " + "\n" + e.getMessage());
		return Response.status(Response.Status.BAD_REQUEST)
					.entity("{\"error\":\"" + e.getMessage() + "\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();
		
        } 
        return Response.status(Response.Status.OK)
				.entity(map)
				.type(MediaType.APPLICATION_JSON)
				.build();
        }
        
        

        public Response findById(int id) {
		Map<String, Object> map = new HashMap<String, Object>();
        String sql = "SELECT cid,cname, cnotes FROM course WHERE cid = ? ";
        Course course = null;
        Connection c = null;
        try {
        c = conn.getConnection();
        PreparedStatement ps = c.prepareStatement(sql);
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();
        if (rs.next()) {
        course = processRow(rs);
        }
		map.put("user", "");
		map.put("data", course);
        c.close();
        } catch (Exception e) {
        Logger.getLogger(CourseDao.class.getName()).severe(()-> "CourseDao.findById " + "\n" + e.getMessage());
		return Response.status(Response.Status.BAD_REQUEST)
					.entity("{\"error\":\"" + e.getMessage() + "\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();

        }
       return Response.status(Response.Status.OK)
				.entity(map)
				.type(MediaType.APPLICATION_JSON)
				.build();
    }

    public Response save(Course course) {
   // if(course.getCid() == null){
   //         return create(course) ;
   //     }
    return course.getCid() > 0 ? update(course) : create(course);
    }

    public Response create(Course course) {
    Connection c = null;
    PreparedStatement ps = null;
	Map<String, Object> map = new HashMap<String, Object>();
        try {
        c = conn.getConnection();
        ps = c.prepareStatement("INSERT INTO course (cname, cnotes) VALUES (?,? )",
        new String[]{"id"});
        ps.setString(1, course.getCname());
        ps.setString(2, course.getCnotes());
        ps.executeUpdate();
        ResultSet rs = ps.getGeneratedKeys();
        rs.next();
        int id = rs.getInt(1);
        course.setCid(id);
		map.put("user", "");
		map.put("data", course);
		c.close();

        } catch (Exception e) {
    Logger.getLogger(CourseDao.class.getName()).severe(()-> "CourseDao.create " + "\n" + e.getMessage());
	return Response.status(Response.Status.BAD_REQUEST)
					.entity("{\"error\":\"" + e.getMessage() + "\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();

        }
    return Response.status(Response.Status.OK)
				.entity(map)
				.type(MediaType.APPLICATION_JSON)
				.build();
    }

    public Response update(Course course) {
    Connection c = null;
	Map<String, Object> map = new HashMap<String, Object>();
        try {
        c = conn.getConnection();

        PreparedStatement ps = c.prepareStatement("UPDATE course SET cname=?, cnotes=?  WHERE cid=?");
        ps.setString(1, course.getCname());
        ps.setString(2, course.getCnotes());

        ps.setInt(3, course.getCid());
        ps.executeUpdate();
		map.put("user", "");
		map.put("data", course);
        c.close();
        } catch (SQLException e) {
    Logger.getLogger(CourseDao.class.getName()).severe(()-> "CourseDao.update " + "\n" + e.getMessage());
	return Response.status(Response.Status.BAD_REQUEST)
					.entity("{\"error\":\"" + e.getMessage() + "\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();
	
        }
    return Response.status(Response.Status.OK)
				.entity(map)
				.type(MediaType.APPLICATION_JSON)
				.build();
    }

    public Response remove(int id) {
    Connection c = null;
	int count;
    try {
    c = conn.getConnection();
    PreparedStatement ps = c.prepareStatement("DELETE FROM course WHERE cid=?");
    ps.setInt(1, id);
    count = ps.executeUpdate();
    c.close();
        } catch (Exception e) {
    Logger.getLogger(CourseDao.class.getName()).severe(()-> "CourseDao.remove " + "\n" + e.getMessage());
	return Response.status(Response.Status.BAD_REQUEST)
					.entity("{\"error\":\"" + e.getMessage() + "\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();
	}				
    if (count == 1) {
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("{\"data\":\"" + true + "\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();
		} else {
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("{\"data\":\"" + false + "\"}")
					.type(MediaType.APPLICATION_JSON)
					.build();
		}
    }

    protected Course processRow(ResultSet rs)  {
            Course course = new Course();
        try {
        course.setCid(rs.getInt("cid"));
        course.setCname(rs.getString("cname"));
        course.setCnotes(rs.getString("cnotes"));
        } catch (SQLException ex) {
    Logger.getLogger(CourseDao.class.getName()).severe(()-> "CourseDao.processRow " + "\n" + ex.getMessage());
        }
    return course;

    }

}

package org.javaapiwebcomponent.resources;

import java.util.logging.Logger;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@javax.inject.Singleton
@Path("/course")
public class CourseApi {
//    CourseDao dao = new CourseDao();
    @Inject  CourseDao dao;
    
	@GET
	@Produces({MediaType.APPLICATION_JSON})
    public Response findAll(
    @DefaultValue("10") @QueryParam("limit") int limit,
    @DefaultValue("1")@QueryParam("offset") int offset
    ) {
        Logger.getLogger(CourseApi.class.getName())
                .severe(() -> "CourseApi.findAll " + "");
        return dao.findAll(limit,offset);
    }

//    @GET
//    @Path("search/{query}")
//    @Produces({MediaType.APPLICATION_JSON})
//    public Response findByName(
//@PathParam("query") String query,
//            @DefaultValue("10") @QueryParam("limit") int limit,
//            @DefaultValue("1")  @QueryParam("offset") int offset
//) {
//        Logger.getLogger(CourseApi.class.getName())
//                .severe(() -> "CourseApi.findByName " + "");
//        System.out.println("findByName: " + query);
//        return dao.findByName(query,limit,offset);
//    }

    @GET
    @Path("{id:\\d+}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response findById(
	@PathParam("id") String id
    ) {
        System.out.println("findById " + id);
        return dao.findById(Integer.parseInt(id));
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON})
    public Response save(Course course) {
	System.out.println("creating course");
        return dao.save(course);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON})
    public Response update(Course course) {
	System.out.println("Updating course: " );
        return dao.update(course);
    }

    @DELETE
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response remove(
	@PathParam("id") int id
    ) {
        return dao.remove(id);
    }

}

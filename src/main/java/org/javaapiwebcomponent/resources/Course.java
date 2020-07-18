package org.javaapiwebcomponent.resources;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;
import javax.json.bind.annotation.JsonbProperty;
import javax.validation.constraints.*;
// import com.fasterxml.jackson.databind.annotation.JsonNaming;
/**
 * @author Mohanad Lababidi
 */
@XmlRootElement
// @JsonNaming(com.fasterxml.jackson.databind.PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Course implements Serializable {

@Digits(fraction=2,integer = 12,message = "field should be Integer not more than 12 number")
private int Cid;
@Pattern(regexp="[A-Za-z0-9\\s-@\\.]",message = "field should have only Strings or numbers")
private String Cname;
@Pattern(regexp="[A-Za-z0-9\\s-@\\.]",message = "field should have only Strings or numbers")
private String Cnotes;
// @JsonProperty( value ="password", access = JsonProperty.Access.WRITE_ONLY)
// @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation

    @JsonbProperty("cid")
    public int getCid() {
		return Cid;
	}
	public void setCid(int Cid) {
		this.Cid = Cid;
	}
    @JsonbProperty("cname")
    public String getCname() {
		return Cname;
	}
	public void setCname(String Cname) {
		this.Cname = Cname;
	}
    @JsonbProperty("cnotes")
    public String getCnotes() {
		return Cnotes;
	}
	public void setCnotes(String Cnotes) {
		this.Cnotes = Cnotes;
	}
}
package is.hi.hbv501g.hbv1.Persistence.DTOs;

public class ParentChildDTO {
    private String ssn;
    private String firstName;
    private String lastName;
    private String parentAuth0Id;

    public ParentChildDTO(String ssn, String firstName, String lastName, String parentAuth0Id) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
        this.parentAuth0Id = parentAuth0Id;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getParentAuth0Id() {
        return parentAuth0Id;
    }
}

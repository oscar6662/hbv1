package is.hi.hbv501g.hbv1.Persistence.Entities;


import javax.persistence.*;
import java.util.UUID;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parents")
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
    private String ssn;
    private String fullName;
    private String firstName;
    private String lastName;
    private String mobile;
    private Enum relation;

    @ManyToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Child> parent = new ArrayList<>();

    public Parent(
            UUID id,
            String ssn,
            String fullName,
            String firstName,
            String lastName,
            String mobile,
            Enum relation) {

        this.id = UUID.randomUUID();
        this.ssn = ssn;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.relation = relation;
    }

    public Parent() {

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Enum getRelation() {
        return relation;
    }

    public void setRelation(Enum relation) {
        this.relation = relation;
    }

    public List<Child> getParent() {
        return parent;
    }

    public void setParent(List<Child> parent) {
        this.parent = parent;
    }
}



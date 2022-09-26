package is.hi.hbv501g.hbv1.Persistence.Entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "children")
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
    private String ssn;
    private String fullName;
    private String firstName;
    private String lastName;
    private Enum relation;

    @ManyToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Parent> parents = new ArrayList<>();

    public Child() {
    }

    public Child(UUID id,
                 String ssn,
                 String fullName,
                 String firstName,
                 String lastName,
                 String mobile,
                 Enum relation
    ) {
        this.id = id;
        this.ssn = ssn;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.relation = relation;
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

    public Enum getRelation() {
        return relation;
    }

    public void setRelation(Enum relation) {
        this.relation = relation;
    }

    public List<Parent> getParents() {
        return parents;
    }

    public void setParents(List<Parent> children) {
        this.parents = children;
    }
}



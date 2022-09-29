package is.hi.hbv501g.hbv1.Persistence.Entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "children")
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ssn;
    private String fullName;
    private String firstName;
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "daycareworker_id", referencedColumnName = "id")
    private DaycareWorker daycareWorker;

    @ManyToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Parent> parents = new ArrayList<>();

    public Child() {
    }

    public Child(
            String ssn,
            String fullName,
            String firstName,
            String lastName
    ) {
        this.ssn = ssn;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
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

    public DaycareWorker getDaycareWorker() {
        return daycareWorker;
    }

    public void setDaycareWorker(DaycareWorker dcw) {
        this.daycareWorker = dcw;
    }

    public List<Parent> getParents() {
        return parents;
    }

    public void setParents(List<Parent> children) {
        this.parents = children;
    }
}



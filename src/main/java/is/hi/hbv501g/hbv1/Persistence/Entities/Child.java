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
    @Column(unique = true)
    private String ssn;

    private String firstName;
    private String lastName;

    @ManyToOne(fetch=FetchType.LAZY)
    private DaycareWorker daycareWorker;

    @ManyToOne(fetch = FetchType.LAZY)
    private Parent parent;

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayReport> dayReports = new ArrayList<>();

    public Child() {
    }

    public Child(
            String ssn,
            String firstName,
            String lastName
    ) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDayReports(List<DayReport> dayReports) {
        this.dayReports = dayReports;
    }

    public List<DayReport> getDayReports() {
        return dayReports;
    }

    public void addDayReport(DayReport dayReport) {
        this.dayReports.add(dayReport);
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

    public DaycareWorker getDaycareWorker() {
        return daycareWorker;
    }

    public void setDaycareWorker(DaycareWorker dcw) {
        this.daycareWorker = dcw;
    }

    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }
}



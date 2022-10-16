package is.hi.hbv501g.hbv1.Persistence.Entities;

import org.springframework.context.annotation.ComponentScan;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "daycareworkers")
public class DaycareWorker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String ssn;

    private String firstName;
    private String lastName;
    private String mobile;
    private String email;
    private int experienceInYears;
    private String address;
    private String location;
    private String locationCode;

    @OneToMany(mappedBy = "daycareWorker", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Child> children = new ArrayList<>();

    @OneToMany(mappedBy = "daycareWorker", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Child> waitingList = new ArrayList<>();

    @OneToMany(mappedBy = "daycareWorker", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayReport> dayReports = new ArrayList<>();

    public DaycareWorker() {

    }
    public DaycareWorker(
            String ssn,
            String firstName,
            String lastName,
            String mobile,
            String email,
            int experienceInYears,
            String address,
            String location,
            String locationCode
    ) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.email = email;
        this.experienceInYears = experienceInYears;
        this.address = address;
        this.location = location;
        this.locationCode = locationCode;
    }

    public List<DayReport> getDayReports() {
        return dayReports;
    }

    public void setDayReports(List<DayReport> dayReports) {
        this.dayReports = dayReports;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Child> getChildren() {
        return children;
    }

    public void setChildren(List<Child> children) {
        this.children = children;
    }

    public int getExperienceInYears() {
        return experienceInYears;
    }

    public void setExperienceInYears(int experienceInYears) {
        this.experienceInYears = experienceInYears;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocationCode() {
        return locationCode;
    }

    public void setLocationCode(String locationCode) {
        this.locationCode = locationCode;
    }

    public List<Child> getWaitingList() {
        return waitingList;
    }

    public void setWaitingList(List<Child> waitingList) {
        this.waitingList = waitingList;
    }
}

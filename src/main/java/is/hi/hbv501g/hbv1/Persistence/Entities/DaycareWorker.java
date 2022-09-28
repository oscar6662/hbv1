package is.hi.hbv501g.hbv1.Persistence.Entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity
@Table(name= "daycareworkers")
public class DaycareWorker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    private String ssn;
    private String fullName;
    private String firstName;
    private String lastName;
    private String mobile;
    private int experienceInYears;
    private String address;
    private String location;
    private int locationCode;

    @OneToMany(mappedBy = "daycareworker", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Child> children = new ArrayList<>();

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Child> waitingList = new ArrayList<>();

    public DaycareWorker() {

    }
    public DaycareWorker(
            String ssn,
            String fullName,
            String firstName,
            String lastName,
            String mobile,
            int experienceInYears,
            String address,
            String location,
            int locationCode
    ) {
        this.ssn = ssn;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.experienceInYears = experienceInYears;
        this.address = address;
        this.location = location;
        this.locationCode = locationCode;
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

    public int getLocationCode() {
        return locationCode;
    }

    public void setLocationCode(int locationCode) {
        this.locationCode = locationCode;
    }

    public List<Child> getWaitingList() {
        return waitingList;
    }

    public void setWaitingList(List<Child> waitingList) {
        this.waitingList = waitingList;
    }
}

package is.hi.hbv501g.hbv1.Persistence.Entities;

import java.io.Serializable;
import java.util.Objects;

public class SsnId implements Serializable {
    private Long id;
    private String ssn;

    public SsnId() {
    }

    public SsnId(Long id, String ssn) {
        this.id = id;
        this.ssn = ssn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SsnId ssnId = (SsnId) o;
        return id.equals(ssnId.id) && ssn.equals(ssnId.ssn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ssn);
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
}

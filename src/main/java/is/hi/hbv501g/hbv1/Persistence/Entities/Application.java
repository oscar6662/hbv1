package is.hi.hbv501g.hbv1.Persistence.Entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long daycareWorkerId;
    private Long parentId;
    private LocalDateTime applicationDateTime;

    public Application(Long daycareWorkerId, Long parentId, LocalDateTime applicationDateTime) {
        this.daycareWorkerId = daycareWorkerId;
        this.parentId = parentId;
        this.applicationDateTime = applicationDateTime;
    }
    public Long getDaycareWorkerId() {
        return daycareWorkerId;
    }
    public void setDaycareWorkerId(Long daycareWorkerId) {
        this.daycareWorkerId = daycareWorkerId;
    }
    public LocalDateTime getApplicationDateTime() {
        return applicationDateTime;
    }
    public void setApplicationDateTime(LocalDateTime applicationDateTime) {
        this.applicationDateTime = applicationDateTime;
    }
    public Long getParentId() {
        return parentId;
    }
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
}

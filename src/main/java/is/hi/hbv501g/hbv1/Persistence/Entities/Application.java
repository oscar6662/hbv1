package is.hi.hbv501g.hbv1.Persistence.Entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

/**
 * Application entitie. Table: "applications".
 * Used to apply for a spot with a daycareworker
 */

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long daycareWorkerId;
    private Long parentId;
    private Long childId;
    private LocalDateTime ldt;

    public Application(Long daycareWorkerId, Long parentId, Long childId, LocalDateTime ldt) {
        this.daycareWorkerId = daycareWorkerId;
        this.parentId = parentId;
        this.childId = childId;
        this.ldt = ldt;
    }

    public Long getDaycareWorkerId() {
        return daycareWorkerId;
    }

    public void setDaycareWorkerId(Long daycareWorkerId) {
        this.daycareWorkerId = daycareWorkerId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getChildId() {
        return childId;
    }

    public void setChildId(Long childId) {
        this.childId = childId;
    }

    public LocalDateTime gDateTime() {
        return ldt;
    }

    public void setDateTime(LocalDateTime ldt) {
        this.ldt = ldt;
    }
}

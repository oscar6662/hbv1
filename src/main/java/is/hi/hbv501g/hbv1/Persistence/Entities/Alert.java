package is.hi.hbv501g.hbv1.Persistence.Entities;

import javax.persistence.*;
import java.time.LocalDateTime;


/**
 * Alert entity.  An object used to send alerts from DaycareWorker to Parent.
 */
@Entity
@Table(name = "alerts")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime timestamp;
    private Severity severity;
    private String title;
    private String description;

    public Alert() {
    }

    public Alert(
            LocalDateTime timestamp,
            Severity severity,
            String title,
            String description) {
        this.timestamp = timestamp;
        this.severity = severity;
        this.title = title;
        this.description = description;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

package is.hi.hbv501g.hbv1.Persistence.Entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "dayreports")
public class DayReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private LocalDateTime sleepFrom;
    private LocalDateTime sleepTo;
    private Appetite appetite;
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    private DaycareWorker daycareWorker;

    @ManyToOne(fetch = FetchType.LAZY)
    private Child child;

    public DayReport() {
    }

    public DayReport(LocalDateTime sleepFrom,
                     LocalDateTime sleepTo,
                     Appetite appetite,
                     String comment,
                     DaycareWorker daycareWorker) {
        this.date = LocalDate.now();
        this.sleepFrom = sleepFrom;
        this.sleepTo = sleepTo;
        this.appetite = appetite;
        this.comment = comment;
        this.daycareWorker = daycareWorker;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDateTime getSleepFrom() {
        return sleepFrom;
    }

    public void setSleepFrom(LocalDateTime sleepFrom) {
        this.sleepFrom = sleepFrom;
    }

    public LocalDateTime getSleepTo() {
        return sleepTo;
    }

    public void setSleepTo(LocalDateTime sleepTo) {
        this.sleepTo = sleepTo;
    }

    public Appetite getAppetite() {
        return appetite;
    }

    public void setAppetite(Appetite appetite) {
        this.appetite = appetite;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public DaycareWorker getDaycareWorker() {
        return daycareWorker;
    }

    public void setDaycareWorker(DaycareWorker daycareWorker) {
        this.daycareWorker = daycareWorker;
    }
}

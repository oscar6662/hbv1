package is.hi.hbv501g.hbv1.Persistence.Repositories;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Repository of Day Reports
 */
public interface DayReportRepository extends JpaRepository<DayReport, Long> {
    DayReport save(DayReport dayReport);
    void delete(DayReport dayReport);  
    //@Query("SELECT  FROM Recipe r WHERE r.id IN :ids") 
    List<DayReport> findByChild(Child child);
}

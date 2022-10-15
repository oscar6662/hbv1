package is.hi.hbv501g.hbv1.Persistence.Repositories;

import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayReportRepository extends JpaRepository<DayReport, Long> {
    DayReport save(DayReport dayReport);
    void delete(DayReport dayReport);

}

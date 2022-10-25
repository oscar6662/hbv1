package is.hi.hbv501g.hbv1.Services;

import is.hi.hbv501g.hbv1.Persistence.Entities.Appetite;
import is.hi.hbv501g.hbv1.Persistence.Entities.Application;
import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Interface definitions for the DaycareWorkerService.
 */
public interface DaycareWorkerService {
    List<DaycareWorker> findByLocation(String location);
    List<DaycareWorker> findByLocationCode(String locationCode);
    DaycareWorker findDaycareWorkerById(Long id);
    DaycareWorker findDaycareWorkerByEmail(String email);
    List<DaycareWorker> findAll();
    DaycareWorker addDaycareWorker(DaycareWorker daycareWorker);
    DayReport createDayReport(DayReport dayReport);
    Application applyForDaycareWorker(Application application);
    void delete(DaycareWorker daycareWorker);
}


